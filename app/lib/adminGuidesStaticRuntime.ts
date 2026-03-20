import { getCloudflareContext } from "@opennextjs/cloudflare";
import { buildAdminGuidesStaticData, type AdminGuidesStaticData } from "@/app/lib/adminGuidesStatic";

const DRAFT_KEY = "guides-static-draft";

interface DraftStore {
  get(key: string, type: "json"): Promise<{ updatedAt: string; data: AdminGuidesStaticData } | null>;
}

function mergeSavedGuidesData(saved: AdminGuidesStaticData): AdminGuidesStaticData {
  const bundled = buildAdminGuidesStaticData();
  const bundledSectionById = new Map(bundled.sections.map((section) => [section.id, section]));
  const bundledTrackById = new Map(bundled.mainPage.tracks.map((track) => [track.id, track]));

  return {
    mainPage: {
      ...saved.mainPage,
      tracks: saved.mainPage.tracks.map((track) => {
        const fallback = bundledTrackById.get(track.id);
        return fallback
          ? {
              ...track,
              accentColor: fallback.accentColor,
              accentBg: fallback.accentBg,
              emoji: fallback.emoji,
              subtitle: fallback.subtitle,
            }
          : track;
      }),
    },
    sections: saved.sections.map((section) => {
      const fallback = bundledSectionById.get(section.id);
      return fallback
        ? {
            ...section,
            accentColor: fallback.accentColor,
            accentBg: fallback.accentBg,
            emoji: fallback.emoji,
            trackLabel: fallback.trackLabel,
          }
        : section;
    }),
  };
}

export async function getAdminGuidesStaticRuntimeData(): Promise<AdminGuidesStaticData> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const candidate = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as Partial<DraftStore> | undefined;

    if (candidate && typeof candidate.get === "function") {
      const saved = await candidate.get(DRAFT_KEY, "json");
      if (saved?.data) {
        return mergeSavedGuidesData(saved.data);
      }
    }
  } catch {
    // fall back to bundled data during build or when KV is unavailable
  }

  return buildAdminGuidesStaticData();
}
