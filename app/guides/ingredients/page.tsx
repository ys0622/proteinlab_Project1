import { permanentRedirect } from "next/navigation";

export default function IngredientsPageRedirect() {
  permanentRedirect("/guides/product-selection-comparison");
}
