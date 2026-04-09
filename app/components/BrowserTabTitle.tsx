"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const FIXED_TAB_TITLE = "프로틴랩(ProteinLab)";

export default function BrowserTabTitle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    document.title = FIXED_TAB_TITLE;
  }, [pathname, searchParams]);

  return null;
}
