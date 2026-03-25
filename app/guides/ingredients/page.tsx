import { redirect } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function IngredientsPageRedirect() {
  redirect("/guides/product-selection-comparison");
}
