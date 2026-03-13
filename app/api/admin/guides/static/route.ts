import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { verifySessionToken } from "@/app/lib/session";
import { buildAdminGuidesStaticData, type AdminGuidesStaticData } from "@/app/lib/adminGuidesStatic";

const DRAFT_KEY = "guides-static-draft";

interface DraftStore {
  get(key: string, type: "json"): Promise<{ updatedAt: string; data: AdminGuidesStaticData } | null>;
  put(key: string, value: string): Promise<void>;
  delete?(key: string): Promise<void>;
}

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

async function getDraftStore(): Promise<DraftStore | undefined> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const candidate = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as Partial<DraftStore> | undefined;

    if (candidate && typeof candidate.get === "function" && typeof candidate.put === "function") {
      return candidate as DraftStore;
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const draftStore = await getDraftStore();

  if (!draftStore) {
    return NextResponse.json({
      data: buildAdminGuidesStaticData(),
      storageMode: "browser",
      message: "GUIDES_STATIC_DRAFTS_KV 바인딩이 없어 브라우저 저장 모드로 동작합니다.",
    });
  }

  const saved = await draftStore.get(DRAFT_KEY, "json");

  return NextResponse.json({
    data: saved?.data ?? buildAdminGuidesStaticData(),
    savedAt: saved?.updatedAt ?? "",
    storageMode: "kv",
  });
}

export async function PUT(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const draftStore = await getDraftStore();

  if (!draftStore) {
    return NextResponse.json(
      {
        error:
          "Cloudflare KV 바인딩 GUIDES_STATIC_DRAFTS_KV가 설정되지 않아 서버 저장을 사용할 수 없습니다. 현재는 브라우저 저장으로만 동작합니다.",
      },
      { status: 501 },
    );
  }

  const data = (await request.json()) as AdminGuidesStaticData;
  const updatedAt = new Date().toISOString();
  await draftStore.put(DRAFT_KEY, JSON.stringify({ updatedAt, data }));

  return NextResponse.json({ ok: true, savedAt: updatedAt, storageMode: "kv" });
}

export async function DELETE() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const draftStore = await getDraftStore();

  if (!draftStore || typeof draftStore.delete !== "function") {
    return NextResponse.json(
      { error: "KV 바인딩이 없어 서버 저장 초안을 삭제할 수 없습니다." },
      { status: 501 },
    );
  }

  await draftStore.delete(DRAFT_KEY);
  return NextResponse.json({ ok: true });
}
