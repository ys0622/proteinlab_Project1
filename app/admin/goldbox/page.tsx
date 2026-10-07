"use client";

import { useCallback, useEffect, useState } from "react";

type Offer = {
  slug: string; offerName: string; price: number; href: string;
  source: "coupang_app" | "coupang_web"; verifiedAt: string; expiresAt: string;
};
type Health = {
  status: string; checkedAt: string | null; sourceCount: number; validCount: number;
  matchedCount: number; verifiedCount: number; verifiedMissingFromApiCount: number; error: string | null;
  dailyBaselineCount: number | null; suspiciousDrop: boolean;
};
type Candidate = { productId: number; name: string; price: number; href: string };

function localInputDate(date: Date) {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export default function AdminGoldboxPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [health, setHealth] = useState<Health | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [slug, setSlug] = useState("");
  const [offerName, setOfferName] = useState("");
  const [price, setPrice] = useState("");
  const [href, setHref] = useState("");
  const [source, setSource] = useState<Offer["source"]>("coupang_app");
  const [startsAt, setStartsAt] = useState(() => localInputDate(new Date()));
  const [expiresAt, setExpiresAt] = useState(() => localInputDate(new Date(Date.now() + 12 * 60 * 60 * 1000)));

  const refresh = useCallback(async () => {
    const [offersResponse, healthResponse] = await Promise.all([
      fetch("/api/admin/goldbox", { cache: "no-store" }),
      fetch("/api/goldbox/health", { cache: "no-store" }),
    ]);
    if (offersResponse.ok) {
      const data = (await offersResponse.json()) as { offers: Offer[]; unmatchedCandidates: Candidate[] };
      setOffers(data.offers);
      setCandidates(data.unmatchedCandidates);
    }
    if (healthResponse.ok) setHealth((await healthResponse.json()) as Health);
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  async function save(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/goldbox", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug, offerName, price: Number(price), href, source,
          startsAt: new Date(startsAt).toISOString(), expiresAt: new Date(expiresAt).toISOString(),
        }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "저장하지 못했습니다.");
      setMessage("확인된 특가를 저장했습니다. 만료 시각 이후 자동으로 내려갑니다.");
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "입력값을 확인해 주세요.");
    } finally { setBusy(false); }
  }

  async function remove(offerSlug: string) {
    setBusy(true);
    const response = await fetch("/api/admin/goldbox", {
      method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: offerSlug }),
    });
    setMessage(response.ok ? "특가를 내렸습니다." : "특가를 내리지 못했습니다.");
    await refresh();
    setBusy(false);
  }

  return <div className="mx-auto max-w-3xl space-y-6 p-5 md:p-8">
    <div><h1 className="text-2xl font-bold">골드박스 점검</h1><p className="mt-2 text-sm text-[#657068]">파트너스 API 수신과 프로틴랩 제품 매칭을 분리해 확인합니다. API에 없는 특가만 쿠팡 앱/웹 확인 후 임시 등록하세요.</p></div>
    <section className="rounded-xl border bg-white p-5 text-sm">
      <h2 className="font-bold">자동 수집 상태</h2>
      {health ? <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
        <span>API 상태: {health.status}{health.error ? ` (${health.error})` : ""}</span>
        <span>API 수신: {health.sourceCount}건</span><span>유효 상품: {health.validCount}건</span>
        <span className={health.suspiciousDrop ? "font-bold text-red-700" : ""}>당일 첫 수신: {health.dailyBaselineCount ?? "-"}건{health.suspiciousDrop ? " · 급감" : ""}</span>
        <span>등록 제품 매칭: {health.matchedCount}건</span><span>확인 특가: {health.verifiedCount}건</span>
        <span className={health.verifiedMissingFromApiCount ? "font-bold text-red-700" : ""}>API 누락 확인: {health.verifiedMissingFromApiCount}건</span>
      </div> : <p className="mt-3">상태를 불러오는 중입니다.</p>}
      {health?.checkedAt && <p className="mt-3 text-xs text-[#66736a]">최종 확인: {new Date(health.checkedAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })} KST</p>}
    </section>
    <section className="rounded-xl border bg-white p-5">
      <h2 className="font-bold">쿠팡에서 확인한 특가 등록</h2>
      <p className="mt-1 text-xs text-[#66736a]">등록 제품만 허용하며 최대 36시간 안에 자동 만료됩니다. 상품 구성과 링크를 반드시 확인하세요.</p>
      <form onSubmit={save} className="mt-4 grid gap-3 text-sm md:grid-cols-2">
        <label>제품 slug<input required value={slug} onChange={e => setSlug(e.target.value)} className="mt-1 w-full rounded border p-2" placeholder="등록 제품 slug" /></label>
        <label>판매 구성·확인 내용<input required value={offerName} onChange={e => setOfferName(e.target.value)} className="mt-1 w-full rounded border p-2" placeholder="190mL × 24개 · 와우회원 할인" /></label>
        <label>확인한 가격 (원)<input required type="number" min="1" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 w-full rounded border p-2" /></label>
        <label>확인 출처<select value={source} onChange={e => setSource(e.target.value as Offer["source"])} className="mt-1 w-full rounded border p-2"><option value="coupang_app">쿠팡 앱</option><option value="coupang_web">쿠팡 웹</option></select></label>
        <label className="md:col-span-2">쿠팡 상품/파트너스 링크<input required type="url" value={href} onChange={e => setHref(e.target.value)} className="mt-1 w-full rounded border p-2" placeholder="https://link.coupang.com/a/..." /></label>
        <label>시작 시각<input required type="datetime-local" value={startsAt} onChange={e => setStartsAt(e.target.value)} className="mt-1 w-full rounded border p-2" /></label>
        <label>만료 시각<input required type="datetime-local" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} className="mt-1 w-full rounded border p-2" /></label>
        <button disabled={busy} className="rounded-lg bg-[#16412d] px-4 py-3 font-semibold text-white disabled:opacity-50 md:col-span-2">확인한 특가 저장</button>
      </form>
      {message && <p role="status" className="mt-3 text-sm">{message}</p>}
    </section>
    <section className="rounded-xl border bg-white p-5"><h2 className="font-bold">게시 중인 확인 특가</h2>
      <ul className="mt-3 space-y-2 text-sm">{offers.map(offer => <li key={offer.slug} className="flex items-center justify-between gap-3 rounded border p-3"><span><strong>{offer.slug}</strong><br />{offer.price.toLocaleString("ko-KR")}원 · {new Date(offer.expiresAt).toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })} 만료</span><button disabled={busy} onClick={() => void remove(offer.slug)} className="shrink-0 rounded border px-3 py-2">내리기</button></li>)}</ul>
      {offers.length === 0 && <p className="mt-3 text-sm text-[#66736a]">게시 중인 확인 특가가 없습니다.</p>}
    </section>
    <section className="rounded-xl border bg-white p-5"><h2 className="font-bold">API에는 있지만 등록 제품과 매칭되지 않은 후보</h2>
      <p className="mt-1 text-xs text-[#66736a]">상품명에 단백질·프로틴·쉐이크·요거트가 들어간 후보만 표시합니다. 동일 제품인지 옵션과 구성을 확인하세요.</p>
      <ul className="mt-3 space-y-2 text-sm">{candidates.map(item => <li key={item.productId} className="rounded border p-3"><a href={item.href} target="_blank" rel="sponsored noreferrer noopener" className="font-semibold text-[#16412d] underline">{item.name}</a><p className="mt-1 text-xs">ID {item.productId} · {item.price.toLocaleString("ko-KR")}원</p></li>)}</ul>
      {candidates.length === 0 && <p className="mt-3 text-sm text-[#66736a]">현재 확인할 후보가 없습니다.</p>}
    </section>
  </div>;
}
