import Header from "../components/Header";
import Footer from "../components/Footer";
import EventsClient from "./EventsClient";

export const metadata = {
  title: "브랜드 이벤트 & 혜택 | ProteinLab",
  description:
    "단백질음료 브랜드의 자사몰·공식 스토어 이벤트와 혜택을 한눈에. 할인, 쿠폰, 증정, 무료배송 정보를 확인하세요.",
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
