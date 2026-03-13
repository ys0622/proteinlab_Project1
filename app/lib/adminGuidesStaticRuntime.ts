import { getCloudflareContext } from "@opennextjs/cloudflare";
import { buildAdminGuidesStaticData, type AdminGuidesStaticData } from "@/app/lib/adminGuidesStatic";

const DRAFT_KEY = "guides-static-draft";

interface DraftStore {
  get(key: string, type: "json"): Promise<{ updatedAt: string; data: AdminGuidesStaticData } | null>;
}

export async function getAdminGuidesStaticRuntimeData(): Promise<AdminGuidesStaticData> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const candidate = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as Partial<DraftStore> | undefined;

    if (candidate && typeof candidate.get === "function") {
      const saved = await candidate.get(DRAFT_KEY, "json");
      if (saved?.data) {
        return saved.data;
      }
    }
  } catch {
    // fall back to bundled data during build or when KV is unavailable
  }

  return buildAdminGuidesStaticData();
}
