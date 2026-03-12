import { redirect } from "next/navigation";

export default function RunningBarCurationPage() {
  redirect("/bars?curation=running");
}
