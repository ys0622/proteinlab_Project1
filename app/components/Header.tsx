import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";
import { verifySessionToken } from "@/app/lib/session";

export default async function Header() {
  let isAdmin = false;

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("proteinlab_session")?.value;
    if (token) {
      isAdmin = await verifySessionToken(token);
    }
  } catch {
    isAdmin = false;
  }

  return <HeaderClient isAdmin={isAdmin} />;
}

