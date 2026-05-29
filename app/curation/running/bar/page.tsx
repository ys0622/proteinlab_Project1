import { permanentRedirect } from "next/navigation";

export default function RunningBarCurationPage() {
  permanentRedirect("/bars?curation=running");
}
