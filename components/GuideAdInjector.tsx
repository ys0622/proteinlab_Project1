"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AdSenseBlock from "@/components/AdSenseBlock";
import type { PageType } from "@/lib/analytics";

const LONG_ARTICLE_CHAR_THRESHOLD = 7000;

const EXCLUDED_PREFIXES = [
  "/guides/product-selection-comparison",
  "/guides/tools",
  "/guides/how-to-choose",
  "/guides/by-goal",
];

const MANUAL_AD_PATHS = new Set([
  "/guides/intake-strategy-health/lean-massup-protein-intake",
  "/guides/market-insights/protein-drink-trend-2026",
]);

type Placement = {
  id: string;
  slot?: string;
  target: HTMLElement;
  pageType: PageType;
};

type GuideAdInjectorProps = {
  guideSlot?: string;
  insightSlot?: string;
};

function normalizePath(pathname: string) {
  return pathname.replace(/\/$/, "") || "/";
}

function canAutoInsertAds(pathname: string) {
  const path = normalizePath(pathname);
  const parts = path.split("/").filter(Boolean);

  if (!path.startsWith("/guides/")) return false;
  if (parts.length < 3) return false;
  if (MANUAL_AD_PATHS.has(path)) return false;
  if (EXCLUDED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))) return false;

  return true;
}

function getContentSections(main: HTMLElement) {
  const container = main.querySelector(":scope > div") ?? main;
  return Array.from(container.children).filter((element): element is HTMLElement => element instanceof HTMLElement && element.tagName === "SECTION");
}

function findSectionIndexByTextRatio(sections: HTMLElement[], ratio: number) {
  const lengths = sections.map((section) => section.innerText.trim().length);
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const target = total * ratio;
  let runningTotal = 0;

  for (let index = 0; index < lengths.length; index += 1) {
    runningTotal += lengths[index] ?? 0;
    if (runningTotal >= target) return index;
  }

  return Math.max(0, sections.length - 2);
}

function insertAdContainer(afterSection: HTMLElement, id: string) {
  const container = document.createElement("div");
  container.dataset.guideAutoAd = id;
  afterSection.insertAdjacentElement("afterend", container);
  return container;
}

export default function GuideAdInjector({ guideSlot, insightSlot }: GuideAdInjectorProps) {
  const [placements, setPlacements] = useState<Placement[]>([]);

  useEffect(() => {
    const pathname = normalizePath(window.location.pathname);

    document.querySelectorAll("[data-guide-auto-ad]").forEach((element) => element.remove());

    if (!canAutoInsertAds(pathname)) {
      setPlacements([]);
      return;
    }

    const main = document.querySelector("main");
    if (!(main instanceof HTMLElement)) {
      setPlacements([]);
      return;
    }

    const sections = getContentSections(main);
    if (sections.length < 3) {
      setPlacements([]);
      return;
    }

    const pageType: PageType = pathname.startsWith("/guides/market-insights") ? "insight" : "guide";
    const slot = pageType === "insight" ? insightSlot : guideSlot;
    if (!slot?.trim()) {
      setPlacements([]);
      return;
    }

    const totalTextLength = sections.reduce((sum, section) => sum + section.innerText.trim().length, 0);
    const shouldUseTwoAds = totalTextLength >= LONG_ARTICLE_CHAR_THRESHOLD || sections.length >= 7;
    const targetIndexes = [findSectionIndexByTextRatio(sections, 0.4)];

    if (shouldUseTwoAds) {
      const secondIndex = findSectionIndexByTextRatio(sections, 0.8);
      if (secondIndex !== targetIndexes[0] && secondIndex < sections.length - 1) {
        targetIndexes.push(secondIndex);
      }
    }

    const nextPlacements = targetIndexes.map((sectionIndex, index) => ({
      id: `guide-auto-ad-${index + 1}`,
      slot,
      target: insertAdContainer(sections[sectionIndex] ?? sections[sections.length - 2], `guide-auto-ad-${index + 1}`),
      pageType,
    }));

    setPlacements(nextPlacements);

    return () => {
      document.querySelectorAll("[data-guide-auto-ad]").forEach((element) => element.remove());
      setPlacements([]);
    };
  }, [guideSlot, insightSlot]);

  return (
    <>
      {placements.map((placement) =>
        createPortal(
          <AdSenseBlock
            slot={placement.slot}
            pageType={placement.pageType}
            className="border-[#e2ebe4] bg-[#fbfaf7]"
          />,
          placement.target,
          placement.id,
        ),
      )}
    </>
  );
}
