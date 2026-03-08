"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface Props {
  src: string; // original image URL or data URL
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}

type Tool = "erase" | "restore" | "magic";

interface HistoryEntry {
  imageData: ImageData;
}

// Flood fill for magic wand - RGB 유클리드 거리 기반, 더 넓은 영역 선택
function floodFill(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  startX: number,
  startY: number,
  tolerance: number, // 0~100, 유클리드 거리 임계값 (약 0~130)
  _invert: boolean
): Set<number> {
  const visited = new Set<number>();
  const toErase = new Set<number>();
  const stack: [number, number][] = [[Math.floor(startX), Math.floor(startY)]];

  const idx = (x: number, y: number) => (y * width + x) * 4;
  const inBounds = (x: number, y: number) => x >= 0 && x < width && y >= 0 && y < height;

  const startIdx = idx(Math.floor(startX), Math.floor(startY));
  const r0 = data[startIdx];
  const g0 = data[startIdx + 1];
  const b0 = data[startIdx + 2];

  // 유클리드 거리 (RGB): sqrt(dr^2 + dg^2 + db^2), 최대 ~441
  // tolerance 15~100 -> threshold 약 25~120 (흰배경~다양한 색)
  const threshold = 20 + (tolerance / 100) * 100;
  const colorMatch = (i: number) => {
    const dr = data[i] - r0;
    const dg = data[i + 1] - g0;
    const db = data[i + 2] - b0;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    return dist <= threshold;
  };

  const neighbors = [
    [-1, 0], [1, 0], [0, -1], [0, 1],
    [-1, -1], [-1, 1], [1, -1], [1, 1],
  ];

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const i = idx(x, y);
    if (visited.has(i)) continue;
    visited.add(i);

    if (!inBounds(x, y)) continue;
    if (!colorMatch(i)) continue;

    toErase.add(i);

    for (const [dx, dy] of neighbors) {
      const nx = x + dx;
      const ny = y + dy;
      const ni = idx(nx, ny);
      if (inBounds(nx, ny) && !visited.has(ni)) {
        stack.push([nx, ny]);
      }
    }
  }

  return toErase;
}

// 경계 확장: 선택 영역을 N픽셀 확장 (안티앨리어싱 엣지 포함)
function expandSelection(
  selected: Set<number>,
  width: number,
  height: number,
  pixels: number
): Set<number> {
  const idx = (x: number, y: number) => (y * width + x) * 4;
  const inBounds = (x: number, y: number) => x >= 0 && x < width && y >= 0 && y < height;
  const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];

  let current = new Set(selected);
  for (let p = 0; p < pixels; p++) {
    const expanded = new Set(current);
    current.forEach((i) => {
      const x = Math.floor((i / 4) % width);
      const y = Math.floor((i / 4) / width);
      for (const [dx, dy] of neighbors) {
        const nx = x + dx;
        const ny = y + dy;
        if (inBounds(nx, ny)) expanded.add(idx(nx, ny));
      }
    });
    current = expanded;
  }
  return current;
}

export default function ImageEditor({ src, onSave, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const [tool, setTool] = useState<Tool>("erase");
  const [brushSize, setBrushSize] = useState(20);
  const [magicTolerance, setMagicTolerance] = useState(55);
  const [magicExpand, setMagicExpand] = useState(2);
  const [magicInvert, setMagicInvert] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyIndexRef = useRef(-1);
  const historyRef = useRef<HistoryEntry[]>([]);
  const originalImageData = useRef<ImageData | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    historyIndexRef.current = historyIndex;
    historyRef.current = history;
  }, [historyIndex, history]);

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
      historyRef.current = [{ imageData }];
      historyIndexRef.current = 0;
      setHistory([{ imageData }]);
      setHistoryIndex(0);
    };
    img.src = src;
  }, [src]); // eslint-disable-line react-hooks/exhaustive-deps

  const pushHistory = useCallback((ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const newEntry = { imageData };
    const idx = historyIndexRef.current;
    const trimmed = historyRef.current.slice(0, idx + 1);
    const next = [...trimmed, newEntry];
    historyRef.current = next;
    historyIndexRef.current = next.length - 1;
    setHistory(next);
    setHistoryIndex(next.length - 1);
  }, []);

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

  const applyMagicWand = useCallback(
    (x: number, y: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let selected = floodFill(
        imageData.data,
        canvas.width,
        canvas.height,
        x,
        y,
        magicTolerance,
        false
      );
      if (magicExpand > 0) {
        selected = expandSelection(selected, canvas.width, canvas.height, magicExpand);
      }

      const w = canvas.width;
      const h = canvas.height;
      if (magicInvert) {
        for (let py = 0; py < h; py++) {
          for (let px = 0; px < w; px++) {
            const i = (py * w + px) * 4;
            if (!selected.has(i)) imageData.data[i + 3] = 0;
          }
        }
      } else {
        selected.forEach((i) => {
          imageData.data[i + 3] = 0;
        });
      }
      ctx.putImageData(imageData, 0, 0);
      pushHistory(ctx, canvas);
    },
    [magicTolerance, magicExpand, magicInvert] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const pos = getCanvasPos(e);
      if (tool === "magic") {
        applyMagicWand(pos.x, pos.y);
        return;
      }
      setIsDrawing(true);
      lastPos.current = pos;
      applyBrush(pos.x, pos.y);
    },
    [applyBrush, getCanvasPos, tool, applyMagicWand]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (tool === "magic" || !isDrawing) return;
      const pos = getCanvasPos(e);
      applyBrush(pos.x, pos.y);
      lastPos.current = pos;
    },
    [isDrawing, applyBrush, getCanvasPos, tool]
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
    const idx = historyIndexRef.current;
    if (idx <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const newIndex = idx - 1;
    const entry = historyRef.current[newIndex];
    if (entry) {
      ctx.putImageData(entry.imageData, 0, 0);
      historyIndexRef.current = newIndex;
      setHistoryIndex(newIndex);
    }
  }, []);

  const redo = useCallback(() => {
    const idx = historyIndexRef.current;
    const hist = historyRef.current;
    if (idx >= hist.length - 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const newIndex = idx + 1;
    const entry = hist[newIndex];
    if (entry) {
      ctx.putImageData(entry.imageData, 0, 0);
      historyIndexRef.current = newIndex;
      setHistoryIndex(newIndex);
    }
  }, []);

  const rotate = useCallback((degrees: 90 | 180) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.onload = () => {
      const newCanvas = document.createElement("canvas");
      const newCtx = newCanvas.getContext("2d");
      if (!newCtx) return;

      if (degrees === 180) {
        newCanvas.width = canvas.width;
        newCanvas.height = canvas.height;
        newCtx.translate(newCanvas.width, newCanvas.height);
        newCtx.rotate((degrees * Math.PI) / 180);
        newCtx.drawImage(img, 0, 0);
      } else {
        newCanvas.width = canvas.height;
        newCanvas.height = canvas.width;
        newCtx.translate(newCanvas.width, 0);
        newCtx.rotate((degrees * Math.PI) / 180);
        newCtx.drawImage(img, 0, 0);
      }

      const resultImg = new Image();
      resultImg.onload = () => {
        if (!canvasRef.current) return;
        const c = canvasRef.current;
        const cctx = c.getContext("2d");
        if (!cctx) return;
        c.width = resultImg.width;
        c.height = resultImg.height;
        cctx.drawImage(resultImg, 0, 0);
        const imgData = cctx.getImageData(0, 0, c.width, c.height);
        originalImageData.current = imgData;
        const entry = { imageData: imgData };
        historyRef.current = [entry];
        historyIndexRef.current = 0;
        setHistory([entry]);
        setHistoryIndex(0);
      };
      resultImg.src = newCanvas.toDataURL("image/png");
    };
    img.src = canvas.toDataURL("image/png");
  }, []);

  const clearAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 3; i < imageData.data.length; i += 4) imageData.data[i] = 0;
    ctx.putImageData(imageData, 0, 0);
    pushHistory(ctx, canvas);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const resetToOriginal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !originalImageData.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(originalImageData.current, 0, 0);
    const entry = { imageData: originalImageData.current };
    historyRef.current = [entry];
    historyIndexRef.current = 0;
    setHistory([entry]);
    setHistoryIndex(0);
  }, []);

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
          <button
            onClick={() => setTool("magic")}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
              tool === "magic"
                ? "bg-[var(--accent)] text-white"
                : "bg-[#444] text-gray-300 hover:bg-[#555]"
            }`}
            title="클릭한 영역과 비슷한 색을 한 번에 지움"
          >
            ✨ 매직
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

        {tool === "magic" && (
          <div className="flex items-center gap-2 ml-2 pl-2 border-l border-[#444]">
            <span className="text-xs text-gray-400">허용오차:</span>
            <input
              type="range"
              min="15"
              max="100"
              value={magicTolerance}
              onChange={(e) => setMagicTolerance(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-xs text-gray-300 w-6">{magicTolerance}</span>
            <span className="text-xs text-gray-400">경계:</span>
            <select
              value={magicExpand}
              onChange={(e) => setMagicExpand(Number(e.target.value))}
              className="rounded bg-[#444] text-gray-300 text-xs px-2 py-1"
            >
              <option value={0}>없음</option>
              <option value={1}>1px</option>
              <option value={2}>2px</option>
              <option value={3}>3px</option>
            </select>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="checkbox"
                checked={magicInvert}
                onChange={(e) => setMagicInvert(e.target.checked)}
                className="rounded"
              />
              <span className="text-xs text-gray-400">역선택</span>
            </label>
          </div>
        )}

        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[#444]">
          <button
            onClick={clearAll}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555]"
            title="전체 투명"
          >
            🧹 전체 지우기
          </button>
          <button
            onClick={resetToOriginal}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555]"
            title="원본으로"
          >
            ↩ 원본
          </button>
        </div>

        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={() => rotate(90)}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555]"
            title="90° 회전"
          >
            🔄 90°
          </button>
          <button
            onClick={() => rotate(180)}
            className="px-2 py-1 rounded text-xs bg-[#444] text-gray-300 hover:bg-[#555]"
            title="180° 회전"
          >
            🔄 180°
          </button>
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
            cursor: tool === "erase" || tool === "magic" ? "crosshair" : "cell",
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
        {tool === "erase" && "🖌 지우기 모드"}
        {tool === "restore" && "🖌 복원 모드"}
        {tool === "magic" && `✨ 매직 브러시 (허용오차 ${magicTolerance} · 경계 ${magicExpand}px${magicInvert ? " · 역선택" : ""})`}
        {" · "}브러시 {brushSize}px · 90°/180° 회전 · Ctrl+Z 실행취소 · Ctrl+Shift+Z 다시실행
      </div>
    </div>
  );
}
