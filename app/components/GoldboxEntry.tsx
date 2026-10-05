import TrackedLink from "./TrackedLink";
import GoldboxIcon from "./GoldboxIcon";

export default function GoldboxEntry() {
  return (
    <TrackedLink href="/goldbox" trackingLabel="골드박스 특가 제품 확인" trackingSection="goldbox" trackingPageType="home" linkPosition="goldbox_entry"
      className="fixed right-[56px] top-[5px] z-[51] flex h-[30px] items-center justify-center gap-1 rounded-lg border border-[#e87569] bg-[#bc362f] px-2 text-white shadow-sm transition-colors hover:bg-[#a92d27] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2c783] md:right-5 md:top-20 md:h-9 md:px-2.5">
      <GoldboxIcon className="h-[18px] w-[18px] shrink-0 md:h-5 md:w-5" />
      <span className="flex flex-col items-center whitespace-nowrap text-center text-[10px] font-semibold leading-[1.15] md:text-[11px]"><span>특가 제품</span><span>확인</span></span>
    </TrackedLink>
  );
}
