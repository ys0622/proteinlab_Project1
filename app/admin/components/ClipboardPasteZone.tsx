"use client";

import { useRef, useState } from "react";

interface Props {
  onFile: (file: File) => void;
  /** 외부에서 이미 이미지가 로드된 경우 true → 힌트 대신 "변경" 표시 */
  hasImage?: boolean;
  compact?: boolean; // 제품 등록/수정 페이지용 소형 레이아웃
}

/**
 * 클립보드 붙여넣기 + 파일 선택 + 드래그앤드롭을 하나의 존으로 처리.
 * 이미지 데이터만 처리하고, 텍스트 붙여넣기는 그대로 통과시킵니다.
 */
export default function ClipboardPasteZone({ onFile, hasImage, compact }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [flashPaste, setFlashPaste] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    onFile(file);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (const item of Array.from(items)) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          processFile(file);
          setFlashPaste(true);
          setTimeout(() => setFlashPaste(false), 600);
        }
        return;
      }
    }
    // 이미지 없음 → 기본 텍스트 붙여넣기 통과
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        {/* 파일 선택 버튼 */}
        <label className="cursor-pointer">
          <span className="rounded-lg border border-[var(--border)] bg-[var(--beige-warm)] px-3 py-1.5 text-sm hover:bg-[var(--accent-light)] transition-colors">
            파일 선택
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) processFile(f);
              e.target.value = "";
            }}
          />
        </label>

        {/* 클립보드 붙여넣기 존 (compact) */}
        <div
          tabIndex={0}
          onPaste={handlePaste}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`
            flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm cursor-text
            outline-none transition-all select-none
            focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent
            ${dragOver
              ? "border-[var(--accent)] bg-[var(--accent-light)]"
              : flashPaste
              ? "border-green-400 bg-green-50"
              : "border-dashed border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            }
          `}
        >
          <span className="text-base leading-none">⌘</span>
          <span>{flashPaste ? "붙여넣기 완료!" : "클릭 후 Ctrl+V"}</span>
        </div>

        <span className="text-xs text-[var(--foreground-muted)]">PNG · JPG · WEBP</span>
      </div>
    );
  }

  // 기본 레이아웃 (이미지 작업 페이지용)
  return (
    <div
      tabIndex={0}
      onPaste={handlePaste}
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`
        relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed
        cursor-pointer outline-none transition-all select-none min-h-[100px]
        focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
        ${dragOver
          ? "border-[var(--accent)] bg-[var(--accent-light)]"
          : flashPaste
          ? "border-green-400 bg-green-50"
          : "border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--accent-light)]/30"
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) processFile(f);
          e.target.value = "";
        }}
      />

      {flashPaste ? (
        <p className="text-sm font-medium text-green-600">✓ 이미지 붙여넣기 완료</p>
      ) : dragOver ? (
        <p className="text-sm font-medium text-[var(--accent)]">여기에 놓기</p>
      ) : (
        <>
          <div className="flex items-center gap-3 text-[var(--foreground-muted)]">
            <span className="text-2xl">📋</span>
            <div className="text-left">
              <p className="text-sm font-medium text-[var(--foreground)]">
                {hasImage ? "이미지 변경" : "이미지 입력"}
              </p>
              <p className="text-xs mt-0.5">
                <kbd className="rounded bg-[var(--beige-warm)] border border-[var(--border)] px-1.5 py-0.5 text-[10px] font-mono">Ctrl+V</kbd>
                {" "}붙여넣기 · 파일 선택 · 드래그앤드롭
              </p>
            </div>
          </div>
          <p className="text-[10px] text-[var(--foreground-muted)]">PNG · JPG · WEBP</p>
        </>
      )}
    </div>
  );
}
