"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const ImageEditor = dynamic(() => import("../components/ImageEditor"), { ssr: false });

interface Product {
  slug: string;
  name: string;
  brand: string;
  productType?: string;
  imageStatus?: string;
}

interface ImageState {
  original: string | null;
  processed: string | null;
  preview: string | null; // what's currently shown in preview
}

type WorkMode = "list" | "upload";

function ImageWorkflowContent() {
  const searchParams = useSearchParams();
  const initSlug = searchParams.get("slug") ?? "";
  const initType = (searchParams.get("type") ?? "drink") as "drink" | "bar";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "no-image">("no-image");
  const [mode, setMode] = useState<WorkMode>(initSlug ? "upload" : "list");

  const [selectedSlug, setSelectedSlug] = useState(initSlug);
  const [selectedType, setSelectedType] = useState<"drink" | "bar">(initType);

  const [imageState, setImageState] = useState<ImageState>({
    original: null,
    processed: null,
    preview: null,
  });
  const [urlInput, setUrlInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [removingBg, setRemovingBg] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((r) => r.json())
      .then((data) => {
        const all: Product[] = [
          ...(data.drinks || []).map((p: Product) => ({ ...p, productType: "drink" })),
          ...(data.bars || []).map((p: Product) => ({ ...p, productType: "bar" })),
        ];
        setProducts(all);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) => {
    if (filter === "no-image") return p.imageStatus === "no-image";
    return true;
  });

  const selectProduct = (p: Product) => {
    setSelectedSlug(p.slug);
    setSelectedType((p.productType ?? "drink") as "drink" | "bar");
    setImageState({ original: null, processed: null, preview: null });
    setUploadMsg("");
    setMode("upload");
  };

  const handleFileInput = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setImageState({ original: url, processed: null, preview: url });
    };
    reader.readAsDataURL(file);
  };

  const handleUrlLoad = async () => {
    if (!urlInput) return;
    setImageState({ original: urlInput, processed: null, preview: urlInput });
  };

  const handleRemoveBg = async () => {
    if (!imageState.original) return;
    setRemovingBg(true);
    try {
      // Stub: remove.bg API integration point
      // To enable: POST to /api/admin/images/remove-bg with { imageUrl or base64 }
      await new Promise((r) => setTimeout(r, 1200));
      setUploadMsg(
        "⚠️ 배경 제거 API가 연결되지 않았습니다. REMOVE_BG_API_KEY 환경변수를 설정하거나 수동 편집기를 사용하세요."
      );
    } finally {
      setRemovingBg(false);
    }
  };

  const handleEditorSave = (dataUrl: string) => {
    setImageState((prev) => ({ ...prev, processed: dataUrl, preview: dataUrl }));
    setShowEditor(false);
  };

  const handleUpload = useCallback(async () => {
    const dataUrl = imageState.processed ?? imageState.original;
    if (!dataUrl || !selectedSlug) return;

    setUploading(true);
    setUploadMsg("");
    try {
      // Convert dataUrl to Blob
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const ext = blob.type === "image/png" ? "png" : "jpg";
      const file = new File([blob], `${selectedSlug}.${ext}`, { type: blob.type });

      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", selectedSlug);
      formData.append("productType", selectedType);

      const uploadRes = await fetch("/api/admin/images/upload", {
        method: "POST",
        body: formData,
      });

      if (uploadRes.ok) {
        const data = await uploadRes.json();
        setUploadMsg(`✅ 업로드 완료: ${data.url}`);
        // Update product list
        setProducts((prev) =>
          prev.map((p) =>
            p.slug === selectedSlug ? { ...p, imageStatus: "card-ready" } : p
          )
        );
      } else {
        const d = await uploadRes.json();
        setUploadMsg(`❌ 오류: ${d.error}`);
      }
    } catch {
      setUploadMsg("❌ 업로드 실패");
    } finally {
      setUploading(false);
    }
  }, [imageState, selectedSlug, selectedType]);

  const noImageCount = products.filter((p) => p.imageStatus === "no-image").length;

  if (showEditor && imageState.original) {
    return (
      <ImageEditor
        src={imageState.original}
        onSave={handleEditorSave}
        onClose={() => setShowEditor(false)}
      />
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">이미지 작업</h1>
          <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
            이미지 없는 제품: <strong>{noImageCount}개</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setMode("list")}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              mode === "list"
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] text-[var(--foreground-muted)]"
            }`}
          >
            목록
          </button>
          <button
            onClick={() => setMode("upload")}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              mode === "upload"
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] text-[var(--foreground-muted)]"
            }`}
          >
            이미지 작업
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left: Product List */}
        <div className="w-64 shrink-0">
          <div className="flex gap-1 mb-3">
            <button
              onClick={() => setFilter("no-image")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${
                filter === "no-image"
                  ? "bg-orange-100 text-orange-700"
                  : "border border-[var(--border)] text-[var(--foreground-muted)]"
              }`}
            >
              이미지 없음 ({noImageCount})
            </button>
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${
                filter === "all"
                  ? "bg-[var(--accent-light)] text-[var(--accent)]"
                  : "border border-[var(--border)] text-[var(--foreground-muted)]"
              }`}
            >
              전체
            </button>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] overflow-hidden max-h-[calc(100vh-200px)] overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-sm text-[var(--foreground-muted)]">로딩 중...</div>
            ) : filtered.length === 0 ? (
              <div className="p-4 text-center text-sm text-[var(--foreground-muted)]">없음</div>
            ) : (
              filtered.map((p) => (
                <button
                  key={p.slug}
                  onClick={() => selectProduct(p)}
                  className={`w-full text-left px-3 py-2.5 text-sm border-b border-[var(--border)] last:border-0 transition-colors ${
                    selectedSlug === p.slug
                      ? "bg-[var(--accent-light)] text-[var(--accent)]"
                      : "hover:bg-[var(--beige-warm)]"
                  }`}
                >
                  <div className="font-medium text-[var(--foreground)] truncate">{p.name}</div>
                  <div className="text-xs text-[var(--foreground-muted)]">{p.brand}</div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right: Upload Workflow */}
        <div className="flex-1">
          {!selectedSlug ? (
            <div className="flex items-center justify-center h-64 rounded-xl border border-dashed border-[var(--border)] text-[var(--foreground-muted)] text-sm">
              왼쪽에서 제품을 선택하세요
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1">
                  {products.find((p) => p.slug === selectedSlug)?.name ?? selectedSlug}
                </h3>
                <p className="text-xs text-[var(--foreground-muted)]">{selectedSlug}</p>
              </div>

              {/* Image Input */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--foreground)]">1. 이미지 입력</h3>

                {/* File upload */}
                <label className="flex items-center gap-2 cursor-pointer">
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--beige-warm)] px-4 py-2 text-sm hover:bg-[var(--accent-light)] transition-colors">
                    파일 선택
                  </div>
                  <span className="text-xs text-[var(--foreground-muted)]">PNG, JPG, WEBP</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleFileInput(f);
                    }}
                  />
                </label>

                {/* Drag & drop */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const f = e.dataTransfer.files[0];
                    if (f) handleFileInput(f);
                  }}
                  className="flex items-center justify-center h-16 rounded-lg border border-dashed border-[var(--border)] text-xs text-[var(--foreground-muted)]"
                >
                  또는 이미지를 여기로 드래그
                </div>

                {/* URL input */}
                <div className="flex gap-2">
                  <input
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="이미지 URL 붙여넣기..."
                    className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  />
                  <button
                    onClick={handleUrlLoad}
                    className="rounded-lg bg-[var(--beige-warm)] border border-[var(--border)] px-3 py-2 text-sm hover:bg-[var(--accent-light)]"
                  >
                    불러오기
                  </button>
                </div>
              </div>

              {/* Preview + Processing */}
              {imageState.preview && (
                <>
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">2. 미리보기 & 편집</h3>
                    <div className="flex gap-4 items-start">
                      {/* Preview */}
                      <div className="relative w-48 h-48 rounded-lg border border-[var(--border)] overflow-hidden bg-gray-100 shrink-0" style={{
                        backgroundImage: "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                        backgroundSize: "16px 16px",
                        backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                        backgroundColor: "#f0f0f0",
                      }}>
                        <Image
                          src={imageState.preview}
                          alt="Preview"
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>

                      {/* Actions */}
                      <div className="space-y-2 flex-1">
                        <button
                          onClick={handleRemoveBg}
                          disabled={removingBg}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm hover:bg-[var(--beige-warm)] disabled:opacity-50 transition-colors"
                        >
                          {removingBg ? "배경 제거 중..." : "🪄 배경 자동 제거"}
                        </button>
                        <button
                          onClick={() => setShowEditor(true)}
                          className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm hover:bg-[var(--beige-warm)] transition-colors"
                        >
                          ✏️ 수동 편집 (브러시)
                        </button>
                        {imageState.processed && (
                          <button
                            onClick={() =>
                              setImageState((prev) => ({
                                ...prev,
                                preview: prev.original,
                                processed: null,
                              }))
                            }
                            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm text-[var(--foreground-muted)] hover:bg-[var(--beige-warm)] transition-colors"
                          >
                            원본으로 되돌리기
                          </button>
                        )}
                        <p className="text-xs text-[var(--foreground-muted)]">
                          {imageState.processed ? "✅ 편집된 이미지 적용됨" : "원본 이미지"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {uploadMsg && (
                    <div className={`rounded-lg px-4 py-3 text-sm ${
                      uploadMsg.startsWith("✅")
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : uploadMsg.startsWith("⚠️")
                        ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}>
                      {uploadMsg}
                    </div>
                  )}

                  {/* Upload */}
                  <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4">
                    <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">3. 저장</h3>
                    <div className="flex items-center gap-3">
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value as "drink" | "bar")}
                        className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm"
                      >
                        <option value="drink">단백질 음료</option>
                        <option value="bar">단백질 바</option>
                      </select>
                      <button
                        onClick={handleUpload}
                        disabled={uploading}
                        className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
                      >
                        {uploading ? "저장 중..." : "이미지 저장"}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-[var(--foreground-muted)]">
                      파일명: <code>{selectedSlug}.png</code> 으로 저장됩니다.
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ImagesPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[var(--foreground-muted)]">로딩 중...</div>}>
      <ImageWorkflowContent />
    </Suspense>
  );
}
