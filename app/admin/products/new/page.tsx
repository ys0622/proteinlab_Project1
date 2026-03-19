"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ClipboardPasteZone from "../../components/ClipboardPasteZone";
import { ORDERED_CATEGORY_IDS, getCategoryLabel, type ProductCategory } from "@/app/lib/categories";

const inputCls =
  "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--foreground)] mb-1">{label}</label>
      {hint && <p className="text-xs text-[var(--foreground-muted)] mb-1">{hint}</p>}
      {children}
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  const handleImageFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImgPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const [form, setForm] = useState({
    slug: "",
    brand: "",
    manufacturer: "",
    name: "",
    productType: "drink" as ProductCategory,
    flavor: "",
    variant: "",
    capacity: "",
    drinkType: "밀크형",
    proteinSource: "유청",
    tags: "",
    productUrl: "#",
    coupangUrl: "",
    // Nutrition
    proteinPerServing: "",
    calories: "",
    sugar: "",
    fat: "",
    sodium: "",
    bcaa: "",
    density: "",
    calorieDensity: "",
    // Nutrition per bottle
    caloriesKcal: "",
    proteinG: "",
    carbsG: "",
    sugarsG: "",
    fatG: "",
    satFatG: "",
    sodiumMg: "",
    bcaaMg: "",
    // Grades
    gradeTags: "",
    adminMemo: "",
  });

  const set = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from brand + name if not manually set
    if (field === "name" || field === "brand") {
      const brand = field === "brand" ? value : form.brand;
      const name = field === "name" ? value : form.name;
      if (brand && name) {
        const capacity = form.capacity.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
        setForm((prev) => ({
          ...prev,
          [field]: value,
          slug: slugify(`${brand}-${name}${capacity ? "-" + capacity : ""}`),
        }));
      }
    }
  };

  const n = (val: string) => (val === "" ? undefined : Number(val));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.slug || !form.brand || !form.name) {
      setError("slug, 브랜드, 제품명은 필수입니다.");
      return;
    }

    setSaving(true);
    try {
      const product = {
        slug: form.slug,
        brand: form.brand,
        manufacturer: form.manufacturer || undefined,
        name: form.name,
        productType: form.productType,
        flavor: form.flavor || undefined,
        variant: form.variant || undefined,
        capacity: form.capacity || undefined,
        drinkType: form.productType === "drink" ? (form.drinkType || undefined) : undefined,
        proteinSource: form.proteinSource || undefined,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        productUrl: form.productUrl.trim() || "#",
        coupangUrl: form.coupangUrl?.trim() || undefined,
        proteinPerServing: n(form.proteinPerServing),
        calories: n(form.calories),
        sugar: n(form.sugar),
        fat: n(form.fat),
        sodium: n(form.sodium),
        bcaa: form.bcaa || undefined,
        density: form.density || undefined,
        calorieDensity: form.calorieDensity || undefined,
        gradeTags: form.gradeTags.split(",").map((t) => t.trim()).filter(Boolean),
        nutritionPerBottle: {
          caloriesKcal: n(form.caloriesKcal),
          proteinG: n(form.proteinG),
          carbsG: n(form.carbsG),
          sugarsG: n(form.sugarsG),
          fatG: n(form.fatG),
          satFatG: n(form.satFatG),
          sodiumMg: n(form.sodiumMg),
          bcaaMg: n(form.bcaaMg),
        },
        adminMemo: form.adminMemo || undefined,
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (res.ok) {
        // 이미지가 붙여넣어진 경우 자동 업로드
        if (imgPreview) {
          try {
            const imgRes = await fetch(imgPreview);
            const blob = await imgRes.blob();
            const ext = blob.type === "image/png" ? "png" : "jpg";
            const imgFile = new File([blob], `${form.slug}.${ext}`, { type: blob.type });
            const formData = new FormData();
            formData.append("file", imgFile);
            formData.append("slug", form.slug);
            formData.append("productType", form.productType);
            await fetch("/api/admin/images/upload", { method: "POST", body: formData });
          } catch {
            // 이미지 업로드 실패해도 제품 등록은 성공으로 처리
          }
        }
        router.push(`/admin/products/${form.slug}/edit`);
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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin/products" className="text-sm text-[var(--foreground-muted)] hover:text-[var(--accent)]">
            ← 목록
          </Link>
          <h1 className="text-xl font-semibold text-[var(--foreground)] mt-1">제품 추가</h1>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* A. 기본 정보 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">A. 기본 정보</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="카테고리">
              <select
                value={form.productType}
                onChange={(e) => set("productType", e.target.value)}
                className={inputCls}
              >
                {ORDERED_CATEGORY_IDS.map((category) => (
                  <option key={category} value={category}>
                    {getCategoryLabel(category)}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="브랜드 *">
              <input
                value={form.brand}
                onChange={(e) => set("brand", e.target.value)}
                className={inputCls}
                required
              />
            </Field>
            <Field label="제조사">
              <input
                value={form.manufacturer}
                onChange={(e) => set("manufacturer", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="제품명 *" hint="브랜드명 제외한 제품 고유명">
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                className={inputCls}
                required
              />
            </Field>
            <Field label="용량 / 중량">
              <input
                value={form.capacity}
                onChange={(e) => set("capacity", e.target.value)}
                className={inputCls}
                placeholder="245mL / 50g"
              />
            </Field>
            <Field label="맛">
              <input
                value={form.flavor}
                onChange={(e) => set("flavor", e.target.value)}
                className={inputCls}
                placeholder="초콜릿"
              />
            </Field>
            <Field label="변형 (variant)">
              <input
                value={form.variant}
                onChange={(e) => set("variant", e.target.value)}
                className={inputCls}
                placeholder="락토프리"
              />
            </Field>
            <Field label="태그 (쉼표 구분)">
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                className={inputCls}
                placeholder="팩, PET"
              />
            </Field>
            {form.productType === "drink" && (
              <Field label="음료 타입">
                <select
                  value={form.drinkType}
                  onChange={(e) => set("drinkType", e.target.value)}
                  className={inputCls}
                >
                  <option value="밀크형">밀크형</option>
                  <option value="워터형">워터형</option>
                </select>
              </Field>
            )}
            <Field label="단백질 원료">
              <select
                value={form.proteinSource}
                onChange={(e) => set("proteinSource", e.target.value)}
                className={inputCls}
              >
                <option value="유청">유청</option>
                <option value="식물성">식물성</option>
                <option value="혼합">혼합</option>
                <option value="카제인">카제인</option>
              </select>
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Slug *" hint="URL에 사용되는 고유 ID. 자동 생성되거나 직접 입력.">
              <input
                value={form.slug}
                onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                className={inputCls}
                placeholder="brand-product-name-245ml"
                required
              />
            </Field>
          </div>
        </section>

        {/* B. 영양 정보 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-1">B. 영양 정보</h2>
          <p className="text-xs text-[var(--foreground-muted)] mb-4">1병(개) 기준</p>
          <div className="grid grid-cols-3 gap-4">
            {[
              ["단백질 (g)", "proteinG"],
              ["칼로리 (kcal)", "caloriesKcal"],
              ["당류 (g)", "sugarsG"],
              ["지방 (g)", "fatG"],
              ["포화지방 (g)", "satFatG"],
              ["나트륨 (mg)", "sodiumMg"],
              ["탄수화물 (g)", "carbsG"],
              ["BCAA (mg)", "bcaaMg"],
            ].map(([label, field]) => (
              <Field key={field} label={label}>
                <input
                  type="number"
                  step="any"
                  value={form[field as keyof typeof form]}
                  onChange={(e) => set(field, e.target.value)}
                  className={inputCls}
                />
              </Field>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-2 gap-4">
            <Field label="단백질/서빙 (g)" hint="카드 표시 핵심 값">
              <input
                type="number"
                step="any"
                value={form.proteinPerServing}
                onChange={(e) => set("proteinPerServing", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="칼로리 (kcal)">
              <input
                type="number"
                step="any"
                value={form.calories}
                onChange={(e) => set("calories", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="당류 (g)">
              <input
                type="number"
                step="any"
                value={form.sugar}
                onChange={(e) => set("sugar", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="지방 (g)">
              <input
                type="number"
                step="any"
                value={form.fat}
                onChange={(e) => set("fat", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="나트륨 (mg)">
              <input
                type="number"
                step="any"
                value={form.sodium}
                onChange={(e) => set("sodium", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="BCAA">
              <input
                value={form.bcaa}
                onChange={(e) => set("bcaa", e.target.value)}
                className={inputCls}
                placeholder="4000mg"
              />
            </Field>
            <Field label="단백질 밀도">
              <input
                value={form.density}
                onChange={(e) => set("density", e.target.value)}
                className={inputCls}
                placeholder="10.2g/100ml"
              />
            </Field>
            <Field label="칼로리 밀도">
              <input
                value={form.calorieDensity}
                onChange={(e) => set("calorieDensity", e.target.value)}
                className={inputCls}
                placeholder="55.1kcal/100ml"
              />
            </Field>
          </div>
        </section>

        {/* C. 등급 & 링크 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-sm font-semibold text-[var(--foreground)] mb-4">C. 등급 & 링크</h2>
          <div className="space-y-3">
            <Field label="등급 태그 (쉼표 구분)">
              <input
                value={form.gradeTags}
                onChange={(e) => set("gradeTags", e.target.value)}
                className={inputCls}
                placeholder="단백질 밀도 A, 다이어트 B"
              />
            </Field>
            <Field label="쿠팡 링크 (coupangUrl)" hint="비워두면 쿠팡 버튼 비활성화">
              <input
                value={form.coupangUrl}
                onChange={(e) => set("coupangUrl", e.target.value)}
                className={inputCls}
                placeholder="https://link.coupang.com/... 또는 https://www.coupang.com/vp/products/..."
              />
            </Field>
            <Field label="관리자 메모">
              <textarea
                value={form.adminMemo}
                onChange={(e) => set("adminMemo", e.target.value)}
                className={`${inputCls} min-h-[60px] resize-y`}
              />
            </Field>
          </div>
        </section>

        {/* D. 이미지 미리 붙여넣기 */}
        <section className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">D. 이미지 (선택)</h2>
            <span className="text-xs text-[var(--foreground-muted)]">제품 저장 후 이미지 작업 페이지에서도 업로드 가능</span>
          </div>
          <ClipboardPasteZone onFile={handleImageFile} hasImage={!!imgPreview} />
          {imgPreview && (
            <div className="mt-3 flex items-center gap-3">
              <div
                className="relative w-20 h-20 rounded-lg border border-[var(--border)] shrink-0 overflow-hidden"
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
              <div>
                <p className="text-xs text-green-600 font-medium">이미지 준비됨</p>
                <p className="text-xs text-[var(--foreground-muted)] mt-0.5">제품 저장 후 자동으로 업로드됩니다.</p>
                <button onClick={() => setImgPreview(null)} className="text-xs text-[var(--foreground-muted)] hover:text-red-500 mt-1">취소</button>
              </div>
            </div>
          )}
        </section>

        <div className="flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="rounded-full border border-[var(--border)] px-5 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--beige-warm)]"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-[var(--accent)] px-6 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] disabled:opacity-60"
          >
            {saving ? "저장 중..." : "제품 추가"}
          </button>
        </div>
      </form>
    </div>
  );
}
