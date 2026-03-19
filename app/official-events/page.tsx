import Header from "../components/Header";
import Footer from "../components/Footer";
import EventsClient from "./EventsClient";

export const metadata = {
  title: "이벤트/핫딜 | ProteinLab",
  description:
    "단백질 음료, 단백질 바, 단백질 요거트, 단백질 쉐이크 브랜드의 자사몰·공식 스토어 이벤트와 혜택을 한눈에 확인하세요.",
};

export default function OfficialEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <EventsClient />
      <Footer />
    </div>
  );
}

