import Link from "next/link";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";

async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
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
