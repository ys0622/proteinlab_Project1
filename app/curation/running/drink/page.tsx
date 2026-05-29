import { permanentRedirect } from "next/navigation";

export default function RunningDrinkCurationPage() {
  permanentRedirect("/?curation=running");
}
