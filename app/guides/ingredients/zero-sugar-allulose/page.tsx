import { redirect } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function ZeroSugarAlluloseRedirectPage() {
  redirect("/guides/product-selection-comparison/zero-sugar-allulose");
}
