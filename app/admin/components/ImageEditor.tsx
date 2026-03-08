"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  src: string; // original image URL or data URL
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}

type Tool = "erase" | "restore";

interface HistoryEntry {
  imageData: ImageData;
}

export default function ImageEditor({ src, onSave, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null); // for brush cursor preview
  const [tool, setTool] = useState<Tool>("erase");
  const [brushSize, setBrushSize] = useState(20);
  const [zoom, setZoom] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const originalImageData = useRef<ImageData | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  // Load image onto canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      originalImageData.current = imageData;
      // Push initial state to history
      pushHistory(ctx, canvas);
    };
    img.src = src;
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  const pushHistory = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => {
      const trimmed = prev.slice(0, historyIndex + 1);
      return [...trimmed, { imageData }];
    });
    setHistoryIndex((prev) => prev + 1);
  };

  const getCanvasPos = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return { x: 0, y: 0 };
      const rect = canvas.getBoundingClientRect();
      let clientX: number, clientY: number;
      if ("touches" in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      return {
        x: ((clientX - rect.left) / zoom) * (canvas.width / (rect.width / zoom)),
        y: ((clientY - rect.top) / zoom) * (canvas.height / (rect.height / zoom)),
      };
    },
    [zoom]
  );

  const applyBrush = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (tool === "erase") {
        // Make pixels transparent
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();
        ctx.restore();
      } else if (tool === "restore" && originalImageData.current) {
        // Restore from original
        const orig = originalImageData.current;
        const current = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const r = brushSize / 2;
        for (let dy = -r; dy <= r; dy++) {
          for (let dx = -r; dx <= r; dx++) {
            if (dx * dx + dy * dy <= r * r) {
              const px = Math.round(x + dx);
              const py = Math.round(y + dy);
              if (px < 0 || px >= canvas.width || py < 0 || py >= canvas.height) continue;
              const i = (py * canvas.width + px) * 4;
              current.data[i] = orig.data[i];
              current.data[i + 1] = orig.data[i + 1];
              current.data[i + 2] = orig.data[i + 2];
              current.data[i + 3] = orig.data[i + 3];
            }
          }
        }
        ctx.putImageData(current, 0, 0);
      }
    },
    [tool, brushSize]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      setIsDrawing(true);
      const pos = getCanvasPos(e);
      lastPos.current = pos;
      applyBrush(pos.x, pos.y);
    },
    [applyBrush, getCanvasPos]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDrawing) return;
      const pos = getCanvasPos(e);
      applyBrush(pos.x, pos.y);
      lastPos.current = pos;
    },
    [isDrawing, applyBrush, getCanvasPos]
  );

  const handleMouseUp = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    lastPos.current = null;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    pushHistory(ctx, canvas);
  }, [isDrawing]); // eslint-disable-line react-hooks/exhaustive-deps

  const undo = useCallback(() => {
    if (historyIndex <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const newIndex = historyIndex - 1;
    ctx.putImageData(history[newIndex].imageData, 0, 0);
    setHistoryIndex(newIndex);
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex >= history.length - 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const newIndex = historyIndex + 1;
    ctx.putImageData(history[newIndex].imageData, 0, 0);
    setHistoryIndex(newIndex);
  }, [history, historyIndex]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    onSave(canvas.toDataURL("image/png"));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#1a1a1a]">
      {/* Toolbar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#2a2a2a] border-b border-[#444] shrink-0">
        <span className="text-sm font-medium text-white">이미지 편집기</span>

        <div className="flex gap-1 ml-4">
          <button
            onClick={() => setTool("erase")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              tool === "erase"
                ? "bg-[var(--accent)] text-white"
                : "bg-[#444] text-gray-300 hover:bg-[#555]"
            }`}
          >
            지우기
          </button>
          <button
            onClick={() => setTool("restore")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              tool === "restore"
                ? "bg-[var(--accent)] text-white"
                : "bg-[#444] text-gray-300 hover:bg-[#555]"
            }`}
          >
            복원
          </button>
        </div>

        <div className="flex items-center gap-2 ml-2">
          <span className="text-xs text-gray-400">브러시:</span>
          <input
            type="range"
            min="2"
            max="100"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-xs text-gray-300 w-8">{brushSize}px</span>
        </div>

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.25, z - 0.25))}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555]"
          >
            −
          </button>
          <span className="text-xs text-gray-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(4, z + 0.25))}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555]"
          >
            +
          </button>
        </div>

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555] disabled:opacity-40"
            title="Ctrl+Z"
          >
            ↩ 실행 취소
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555] disabled:opacity-40"
            title="Ctrl+Shift+Z"
          >
            ↪ 다시 실행
          </button>
        </div>

        <div className="ml-auto flex gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555]"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1.5 rounded text-xs bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
          >
            저장
          </button>
        </div>
      </div>

      {/* Canvas area with checkerboard bg */}
      <div
        className="flex-1 overflow-auto flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)",
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          backgroundColor: "#2a2a2a",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
            cursor: tool === "erase" ? "crosshair" : "cell",
            imageRendering: "pixelated",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        <canvas ref={overlayRef} className="hidden" />
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 bg-[#2a2a2a] border-t border-[#444] text-xs text-gray-400 shrink-0">
        {tool === "erase" ? "🖌 지우기 모드" : "🖌 복원 모드"} · 브러시 {brushSize}px ·
        Ctrl+Z 실행취소 · Ctrl+Shift+Z 다시실행
      </div>
    </div>
  );
}
