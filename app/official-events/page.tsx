import Header from "../components/Header";
import Footer from "../components/Footer";
import EventsClient from "./EventsClient";

export const metadata = {
  title: "단백질 이벤트·핫딜 모음 | 브랜드 공식몰 할인·쿠폰 정리",
  description:
    "단백질 음료, 바, 요거트, 쉐이크 브랜드의 공식몰·네이버 스토어 할인, 쿠폰, 증정, 무료배송 혜택을 한곳에서 확인하세요.",
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
