import Link from "next/link";
import { cookies } from "next/headers";
import crypto from "crypto";

async function isAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("proteinlab_session")?.value;
    if (!token) return false;

    const secret = process.env.SESSION_SECRET ?? "proteinlab-session-secret-change-me";
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const timestamp = token.slice(0, dotIndex);
    const providedHmac = token.slice(dotIndex + 1);

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts) || Date.now() - ts > 86400 * 1000) return false;

    const expectedHmac = crypto
      .createHmac("sha256", secret)
      .update(timestamp)
      .digest("hex");

    return providedHmac === expectedHmac;
  } catch {
    return false;
  }
}

interface Props {
  slug: string;
}

export default async function AdminQuickEdit({ slug }: Props) {
  const admin = await isAdmin();
  if (!admin) return null;

  return (
    <Link
      href={`/admin/products/${slug}/edit`}
      className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
      title="관리자 전용"
    >
      <span>⚙</span>
      관리자 수정
    </Link>
  );
}
