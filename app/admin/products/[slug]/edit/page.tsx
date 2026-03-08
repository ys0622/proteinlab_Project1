"use client";

import { useEffect, useState, use, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ClipboardPasteZone from "../../../components/ClipboardPasteZone";

interface NutritionPerBottle {
  caloriesKcal?: number;
  proteinG?: number;
  carbsG?: number;
  sugarsG?: number;
  fatG?: number;
  satFatG?: number;
  sodiumMg?: number;
  bcaaMg?: number;
}

interface Product {
  slug: string;
  brand: string;
  manufacturer?: string;
  name: string;
  productType?: string;
  capacity?: string;
  variant?: string;
  flavor?: string;
  tags?: string[];
  drinkType?: string;
  proteinSource?: string;
  proteinPerServing?: number;
  calories?: number;
  sugar?: number;
  fat?: number;
  sodium?: number;
  bcaa?: string;
  density?: string;
  calorieDensity?: string;
  gradeTags?: string[];
  productUrl?: string;
  nutritionPerBottle?: NutritionPerBottle;
  adminMemo?: string;
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--foreground)] mb-1">{label}</label>
      {hint && <p className="text-xs text-[var(--foreground-muted)] mb-1">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

const numInput = (
  value: number | string | undefined,
  onChange: (v: string) => void
) => (
  <input
    type="number"
    step="any"
    value={value ?? ""}
    onChange={(e) => onChange(e.target.value)}
    className={inputCls}
  />
);

export default function ProductEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgMsg, setImgMsg] = useState("");

  useEffect(() => {
    fetch(`/api/admin/products/${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.product);
        setLoading(false);
      })
      .catch(() => {
        setError("제품을 불러올 수 없습니다.");
        setLoading(false);
      });
  }, [slug]);

  const set = (field: keyof Product, value: unknown) => {
    setProduct((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const setNutrition = (field: keyof NutritionPerBottle, value: string) => {
    setProduct((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        nutritionPerBottle: {
          ...prev.nutritionPerBottle,
          [field]: value === "" ? undefined : Number(value),
        },
      };
    });
  };

  const handleImageFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgPreview(e.target?.result as string);
    reader.readAsDataURL(file);
    setImgMsg("");
  }, []);

  const handleImageUpload = useCallback(async () => {
    if (!imgPreview || !product) return;
    setImgUploading(true);
    setImgMsg("");
    try {
      const res = await fetch(imgPreview);
      const blob = await res.blob();
      const ext = blob.type === "image/png" ? "png" : "jpg";
      const file = new File([blob], `${slug}.${ext}`, { type: blob.type });
      const formData = new FormData();
      formData.append("file", file);
      formData.append("slug", slug);
      formData.append("productType", product.productType ?? "drink");
      const uploadRes = await fetch("/api/admin/images/upload", { method: "POST", body: formData });
      if (uploadRes.ok) {
        setImgMsg("✅ 이미지 저장 완료");
      } else {
        const d = await uploadRes.json();
        setImgMsg(`❌ ${d.error}`);
      }
    } catch {
      setImgMsg("❌ 업로드 실패");
    } finally {
      setImgUploading(false);
    }
  }, [imgPreview, product, slug]);

  const handleSave = async () => {
    if (!product) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/products/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        const d = await res.json();
        setError(d.error ?? "저장 실패");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-[var(--foreground-muted)]">로딩 중...</div>
    );
  }

  if (!product) {
    return (
      <div className="p-6 text-center text-[var(--foreground-muted)]">
        제품을 찾을 수 없습니다.
        <Link href="/admin/products" className="block mt-4 text-[var(--accent)] hover:underline">
          목록으로
        </Link>
      </div>
    );
  }

  const n = product.nutritionPerBottle ?? {};

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link
            href="/admin/products"
            className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]"
          >
            ← 목록
          </Link>
          <h1 className="text-xl font-semibold text-[var(--foreground)] mt-1">
            제품 수정
          </h1>
          <p className="text-xs text-[var(--foreground-muted)]">{slug}</p>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/admin/images?slug=${slug}&type=${product.productType ?? "drink"}`}
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            이미지 관리
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
          >
            {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* A. 기본 정보 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">A. 기본 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="브랜드">
              <input
                value={product.brand ?? ""}
                onChange={(e) => set("brand", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="제조사">
              <input
                value={product.manufacturer ?? ""}
                onChange={(e) => set("manufacturer", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="제품명" hint="예: 올프로틴 (초콜릿)">
              <input
                value={product.name ?? ""}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="카테고리">
              <select
                value={product.productType ?? "drink"}
                onChange={(e) => set("productType", e.target.value)}
                className={inputCls}
              >
                <option value="drink">단백질 음료</option>
                <option value="bar">단백질 바</option>
              </select>
            </Field>
            <Field label="맛 / 플레이버">
              <input
                value={product.flavor ?? ""}
                onChange={(e) => set("flavor", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="바리에이션 (variant)">
              <input
                value={product.variant ?? ""}
                onChange={(e) => set("variant", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="용량 / 중량">
              <input
                value={product.capacity ?? ""}
                onChange={(e) => set("capacity", e.target.value)}
                className={inputCls}
                placeholder="245mL / 50g"
              />
            </Field>
            <Field label="음료 타입">
              <select
                value={(product as unknown as Record<string, string>).drinkType ?? ""}
                onChange={(e) => set("drinkType", e.target.value)}
                className={inputCls}
              >
                <option value="">선택 안 함</option>
                <option value="밀크형">밀크형</option>
                <option value="워터형">워터형</option>
              </select>
            </Field>
            <Field label="단백질 원료">
              <select
                value={product.proteinSource ?? ""}
                onChange={(e) => set("proteinSource", e.target.value)}
                className={inputCls}
              >
                <option value="">선택 안 함</option>
                <option value="유청">유청</option>
                <option value="식물성">식물성</option>
                <option value="혼합">혼합</option>
                <option value="카제인">카제인</option>
              </select>
            </Field>
            <Field label="태그 (쉼표 구분)">
              <input
                value={(product.tags ?? []).join(", ")}
                onChange={(e) =>
                  set(
                    "tags",
                    e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                  )
                }
                className={inputCls}
                placeholder="팩, PET"
              />
            </Field>
          </div>
        </section>

        {/* B. 영양 정보 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-1">B. 영양 정보</h2>
          <p className="text-xs text-[var(--foreground-muted)] mb-4">1병(개) 기준</p>
          <div className="grid grid-cols-3 gap-4">
            <Field label="단백질 (g)">
              {numInput(n.proteinG, (v) => setNutrition("proteinG", v))}
            </Field>
            <Field label="칼로리 (kcal)">
              {numInput(n.caloriesKcal, (v) => setNutrition("caloriesKcal", v))}
            </Field>
            <Field label="당류 (g)">
              {numInput(n.sugarsG, (v) => setNutrition("sugarsG", v))}
            </Field>
            <Field label="지방 (g)">
              {numInput(n.fatG, (v) => setNutrition("fatG", v))}
            </Field>
            <Field label="포화지방 (g)">
              {numInput(n.satFatG, (v) => setNutrition("satFatG", v))}
            </Field>
            <Field label="나트륨 (mg)">
              {numInput(n.sodiumMg, (v) => setNutrition("sodiumMg", v))}
            </Field>
            <Field label="탄수화물 (g)">
              {numInput(n.carbsG, (v) => setNutrition("carbsG", v))}
            </Field>
            <Field label="BCAA (mg)">
              {numInput(n.bcaaMg, (v) => setNutrition("bcaaMg", v))}
            </Field>
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-4">
            <Field label="단백질/서빙 (g)" hint="카드에 표시되는 핵심 값">
              {numInput(product.proteinPerServing, (v) =>
                set("proteinPerServing", v === "" ? undefined : Number(v))
              )}
            </Field>
            <Field label="칼로리 (kcal)">
              {numInput(product.calories, (v) =>
                set("calories", v === "" ? undefined : Number(v))
              )}
            </Field>
            <Field label="당류 (g)">
              {numInput(product.sugar, (v) =>
                set("sugar", v === "" ? undefined : Number(v))
              )}
            </Field>
            <Field label="지방 (g)">
              {numInput(product.fat, (v) =>
                set("fat", v === "" ? undefined : Number(v))
              )}
            </Field>
            <Field label="나트륨 (mg)">
              {numInput(product.sodium, (v) =>
                set("sodium", v === "" ? undefined : Number(v))
              )}
            </Field>
            <Field label="BCAA">
              <input
                value={product.bcaa ?? ""}
                onChange={(e) => set("bcaa", e.target.value)}
                className={inputCls}
                placeholder="4000mg"
              />
            </Field>
            <Field label="단백질 밀도">
              <input
                value={product.density ?? ""}
                onChange={(e) => set("density", e.target.value)}
                className={inputCls}
                placeholder="10.2g/100ml"
              />
            </Field>
            <Field label="칼로리 밀도">
              <input
                value={product.calorieDensity ?? ""}
                onChange={(e) => set("calorieDensity", e.target.value)}
                className={inputCls}
                placeholder="55.1kcal/100ml"
              />
            </Field>
          </div>
        </section>

        {/* C. 등급 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">C. 등급</h2>
          <Field label="등급 태그 (쉼표 구분)">
            <input
              value={(product.gradeTags ?? []).join(", ")}
              onChange={(e) =>
                set(
                  "gradeTags",
                  e.target.value.split(",").map((t) => t.trim()).filter(Boolean)
                )
              }
              className={inputCls}
              placeholder="단백질 밀도 A, 다이어트 B, 퍼포먼스 A"
            />
          </Field>
          <p className="mt-2 text-xs text-[var(--foreground-muted)]">
            형식: &quot;단백질 밀도 A&quot;, &quot;다이어트 B&quot;, &quot;퍼포먼스 S&quot;
          </p>
        </section>

        {/* D. 링크 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">D. 링크</h2>
          <div className="space-y-3">
            <Field label="구매 링크 (productUrl)">
              <input
                value={product.productUrl ?? ""}
                onChange={(e) => set("productUrl", e.target.value)}
                className={inputCls}
                placeholder="https://..."
              />
            </Field>
          </div>
        </section>

        {/* E. 관리자 메모 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">E. 관리자 메모</h2>
          <textarea
            value={product.adminMemo ?? ""}
            onChange={(e) => set("adminMemo", e.target.value)}
            className={`${inputCls} min-h-[80px] resize-y`}
            placeholder="내부 메모..."
          />
        </section>

        {/* F. 이미지 빠른 업로드 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">F. 이미지</h2>
            <Link
              href={`/admin/images?slug=${slug}&type=${product.productType ?? "drink"}`}
              className="text-xs text-[var(--accent)] hover:underline"
            >
              이미지 작업 페이지에서 편집 →
            </Link>
          </div>

          <ClipboardPasteZone onFile={handleImageFile} hasImage={!!imgPreview} />

          {imgPreview && (
            <div className="mt-3 flex items-start gap-4">
              <div
                className="relative w-28 h-28 rounded-lg border border-[var(--border)] shrink-0 overflow-hidden"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg,#e0e0e0 25%,transparent 25%),linear-gradient(-45deg,#e0e0e0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e0e0e0 75%),linear-gradient(-45deg,transparent 75%,#e0e0e0 75%)",
                  backgroundSize: "12px 12px",
                  backgroundPosition: "0 0,0 6px,6px -6px,-6px 0",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Image src={imgPreview} alt="미리보기" fill className="object-contain" unoptimized />
              </div>
              <div className="flex-1 space-y-2">
                <button
                  onClick={handleImageUpload}
                  disabled={imgUploading}
                  className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
                >
                  {imgUploading ? "저장 중..." : "이미지 저장"}
                </button>
                <button
                  onClick={() => { setImgPreview(null); setImgMsg(""); }}
                  className="block text-xs text-[var(--foreground-muted)] hover:text-red-500"
                >
                  취소
                </button>
                {imgMsg && (
                  <p className={`text-xs ${imgMsg.startsWith("✅") ? "text-green-600" : "text-red-500"}`}>
                    {imgMsg}
                  </p>
                )}
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Save */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => router.push("/admin/products")}
          className="rounded-full border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
        >
          {saving ? "저장 중..." : saved ? "저장됨 ✓" : "저장"}
        </button>
      </div>
    </div>
  );
}
