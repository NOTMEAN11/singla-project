import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import PageHeader from "@/components/pageheader/pageheader";

import PageWrapper from "@/components/wrapper/page-wrapper";
import ContainerWrapper from "@/components/wrapper/container-wrapper";

import BookingSection from "@/components/section/booking/booking-section";
import BookingInfo from "@/components/section/booking/details/info";
import BookingForm from "@/components/section/booking/details/form";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { Step } from "@/types/booking";

import { Check, CheckCircle, Lock } from "lucide-react";
import ConfirmBookingDetail from "@/components/section/booking/confirm/booking-detail";
import ConfirmSummary from "@/components/section/booking/confirm/summary";
import ConfirmUserDetail from "@/components/section/booking/confirm/user-detail";

function BookingPage({ searchParams }: { searchParams: { step: Step } }) {
  const step: Step = searchParams.step || "rooms";

  if (
    step !== "rooms" &&
    step !== "details" &&
    step !== "confirm" &&
    step !== "complete"
  ) {
    return redirect("/booking");
  }

  let rooms = (
    <>
      <Image
        src={"/assets/bgs/bg.jpg"}
        alt="Background"
        width={1400}
        height={100}
        className="object-cover w-full h-[200px]"
      />
      <BookingSection />
    </>
  );

  let details = (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 ">
      <BookingInfo />
      <div className="md:col-span-2 p-4 border rounded-md">
        <BookingForm />
      </div>
      <div> </div>
      <div className="md:col-span-2 p-4 border rounded-md">
        <h1 className="text-xl font-bold">ข้อกำหนดของที่พัก</h1>
        <p className="text-xs">
          ผู้ดูแลที่พักต้องการให้ท่านยอมรับข้อกำหนดต่อไปนี้ของที่พัก
        </p>
        <ul className="list-disc ml-6 text-xs">
          <li>ห้ามจัดงาน/ปาร์ตี้</li>
          <li>ห้ามนำสัตว์เลี้ยงเข้าพัก</li>
          <li>ห้ามสูบบุหรี่ภายในที่พัก</li>
          <li>ช่วงเวลางดส่งเสียงดังคือ 21:00 น. - 09:00 น.</li>
        </ul>
      </div>
    </div>
  );

  let confirm = (
    <div className="w-full max-w-2xl flex items-center justify-center mx-auto">
      <div className="p-4 border rounded-md w-full ">
        <h1 className="font-bold text-lg">ยืนยันการจอง</h1>
        <p className="text-xs">
          กรุณาตรวจสอบข้อมูลของท่านก่อนทำการยืนยันการจองห้องพัก
        </p>
        <ConfirmBookingDetail />
        <ConfirmUserDetail />
        <ConfirmSummary />
      </div>
    </div>
  );

  const complete = (
    <div className="w-full max-w-2xl flex items-center justify-center mx-auto">
      <div className="p-4 border rounded-md w-full ">
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="text-green-500" size={48} />
          <div>
            <h1 className="font-bold text-lg">การจองเสร็จสมบูรณ์</h1>
            <p className="text-xs">
              ระบบจะทำการส่งข้อมูลการชำระเงินผ่านช่องทางอีเมลของท่าน
            </p>
            <div className="text-xs">
              หากต้องการความช่วยสามารถได้ที่นี่{" "}
              <Link href={"/"} className="text-blue-500 underline">
                คลิ๊ก
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <PageWrapper className="mt-20">
      <ContainerWrapper>
        <PageHeader
          title="จองห้อง"
          breadcrumb={[{ title: "จองห้อง", path: "/promotions" }]}
          disableTitle
        />
        <div className="flex items-center justify-center space-x-2 w-full mb-4">
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/booking"
              className={cn(
                " rounded-full w-8 h-8  mb-2 sm:w-12 sm:h-12 text-white flex items-center justify-center",
                step === "rooms"
                  ? "bg-yellow-600 pointer-events-none"
                  : "bg-gray-300"
              )}
            >
              {step === "rooms" ? 1 : <Check />}
            </Link>
            <p className="text-gray-950 mb-2 text-center text-xs">
              เลือกห้องพัก
            </p>
          </div>
          <Separator className="w-full max-w-12 lg:max-w-48 md:max-w-24 mb-8" />
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/booking?step=details"
              className={cn(
                " rounded-full w-8 h-8  mb-2 sm:w-12 sm:h-12 text-white flex items-center justify-center",
                step === "details"
                  ? "bg-yellow-600 pointer-events-none"
                  : "bg-gray-300",
                step === "rooms" && "pointer-events-none"
              )}
            >
              {step === "details" || step === "rooms" ? 2 : <Check />}
            </Link>
            <p className="text-gray-950 mb-2 text-center text-xs">
              รายละเอียดการจอง
            </p>
          </div>
          <Separator className="w-full max-w-12 lg:max-w-48 md:max-w-24 mb-8" />
          <div className="flex flex-col items-center justify-center">
            <Link
              href="/booking?step=confirm"
              className={cn(
                "rounded-full w-8 h-8  mb-2 sm:w-12 sm:h-12 text-white flex items-center justify-center pointer-events-none",
                step === "confirm" ? "bg-yellow-600 " : "bg-gray-300"
              )}
            >
              {step === "details" || step === "rooms" || step === "confirm" ? (
                3
              ) : (
                <Check />
              )}
            </Link>
            <p className="text-gray-950 mb-2 text-center text-xs">
              ยืนยันการจอง
            </p>
          </div>
        </div>
        {step === "rooms" && rooms}
        {step === "details" && details}
        {step === "confirm" && confirm}
        {step === "complete" && complete}
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default BookingPage;

{
  /* <BookingDrawer
            title="ประเภทห้อง"
            desc="ห้องพักมีสิ่งอำนวยความสะดวกทั้งหมดที่คุณต้องการสำหรับการพักผ่อนที่สบาย"
            icon={<BedSingle />}
            render={rooms.map((room) => (
              <div
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full flex justify-start mb-1 text-xs",
                  size: "sm",
                })}
                key={room.slug}
              >
                {room.name}
              </div>
              ))}
              /> */
}
