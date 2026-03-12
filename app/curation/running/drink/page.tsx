import { redirect } from "next/navigation";

export default function RunningDrinkCurationPage() {
  redirect("/?curation=running");
}
