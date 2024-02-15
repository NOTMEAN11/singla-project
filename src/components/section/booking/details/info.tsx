"use client";
import Link from "next/link";
import HoverIcon from "@/components/hover-icon";
import useBookingStore from "@/hooks/usebooking";
import { roomtype } from "@/configs/constant";
import { THB } from "@/lib/utils";
import { format, set } from "date-fns";
import { th } from "date-fns/locale/th";
import { InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button, buttonVariants } from "@/components/ui/button";
import { RoomType } from "@/types/room-type";

type Props = {
  roomtype: RoomType[];
};

function BookingInfo({ roomtype }: Props) {
  const { checkInDate, checkOutDate, room, guest, fee, options, setOptions } =
    useBookingStore();

  const router = useRouter();
  const ROOM_TYPE = roomtype?.find((item) => item.id === room);
  const today = new Date();
  const checkInDateObj = new Date(checkInDate!);
  const checkOutDateObj = new Date(checkOutDate!);
  const timeDifference = checkOutDateObj.getTime() - checkInDateObj.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  const motocycle = daysDifference > 4 ? 1400 : 350 * daysDifference;
  const shuttle = 300 * guest!.adults + guest!.children * 150;
  const buffet = 199 * guest!.adults + guest!.children * 99;

  function getTotalPrice() {
    let price = ROOM_TYPE?.price! * daysDifference + fee;
    if (options?.buffet) {
      price += 199 * guest!.adults;
    }

    // if (isMotocycle) {
    //   price += motocycle;
    // }

    if (options?.shuttle) {
      price += shuttle;
    }

    let vat = price * 0.07;
    price += vat;
    return { price, vat };
  }

  const totalPrice = THB(getTotalPrice().price);
  const feePrice = THB(fee);
  const vatPrice = THB(getTotalPrice().vat);

  return (
    <div>
      <div className="p-2 text-xs border rounded-md">
        <h1 className="mb-2 text-sm font-bold ">รายละเอียดการจอง</h1>
        <div className="flex flex-col space-y-2">
          <div className="grid grid-cols-2">
            <p className="font-semibold text-gray-950">ประเภทห้องพัก</p>
            <Link
              href={"/"}
              className="text-gray-950 hover:text-blue-500 hover:underline"
            >
              {ROOM_TYPE?.name}
            </Link>
          </div>
          <div className="grid grid-cols-2">
            <div className="">
              <p className="font-semibold text-gray-950">เช็คอิน</p>
              <p className="text-gray-950">
                {format(checkInDate!, "dd MMM yyyy", {
                  locale: th,
                })}
              </p>
              <p>14:00 น. – 23:30 น.</p>
            </div>
            <div className="">
              <p className="font-semibold text-gray-950">เช็คเอ้าท์</p>
              <p className="text-gray-950">
                {format(checkOutDate!, "dd MMM yyyy", { locale: th })}
              </p>
              <p>00:00 น. – 11:30 น.</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-semibold text-gray-950">ระยะเวลาเข้าพัก</p>
            <p className="text-gray-950">{Math.floor(daysDifference)} วัน</p>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-semibold text-gray-950">ผู้ใหญ่</p>
            <p className="text-gray-950">{guest?.adults} คน</p>
          </div>
          <div className="grid grid-cols-2 ">
            <p className="font-semibold text-gray-950">เด็ก</p>
            <p className="text-gray-950">{guest?.children} คน</p>
          </div>
          <Link
            href="/booking"
            className={buttonVariants({
              variant: "outline",
              className: "w-full",
            })}
          >
            แก้ไขรายละเอียดการจอง
          </Link>
        </div>
      </div>
      <div className="p-2 my-2 text-xs border rounded-md">
        <h1 className="mb-2 text-sm font-bold">ตัวเลือกเพิ่มเติม</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center my-1 space-x-2">
            <Checkbox
              id="buffet"
              checked={options?.buffet}
              onCheckedChange={(e) => {
                if (!room || room === null) {
                  toast.error("มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง");
                  router.push("/booking");
                  return;
                }
                setOptions({ ...options, buffet: e as boolean });
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="buffet"
                className="flex items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                บุฟเฟ่ต์เช้า
                <HoverIcon
                  icon={<InfoIcon size={14} className="ml-1" />}
                  content={
                    <div>
                      <p>
                        บุฟเฟ่ต์เช้าของทางรีสอร์ทมีบริการให้เลือกหลากหลายเมนู
                        สำหรับลูกค้าที่ต้องการใช้บริการ
                        โปรดแจ้งล่วงหน้าเพื่อให้ทางรีสอร์ทได้จัดเตรียมให้
                        หรือสามารถเลือกได้ที่เคาน์เตอร์
                        โดยจะมีค่าบริการเพิ่มเติม 199 บาทต่อท่าน หรือ 99
                        บาทสำหรับเด็ก
                      </p>
                    </div>
                  }
                />
              </label>
            </div>
          </div>

          <p>{THB(buffet)}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-1 space-x-2">
            <Checkbox
              id="shuttle"
              checked={options?.shuttle}
              onCheckedChange={(e) => {
                if (!room || room === null) {
                  toast.error("มีบางอย่างผิดพลาด โปรดลองใหม่อีกครั้ง");
                  router.push("/booking");
                  return;
                }
                setOptions({ ...options, shuttle: e as boolean });
              }}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="shuttle"
                className="flex items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <div>รถรับ-ส่งสนามบิน</div>
                <HoverIcon
                  icon={<InfoIcon size={14} className="ml-1" />}
                  content={
                    <div>
                      <p>
                        มีบริการรถรับ-ส่งสนามบินสนามบินภูเก็ต
                        โดยจะมีค่าบริการเพิ่มเติม 300 บาทต่อท่าน สำหรับเด็ก 150
                        บาทต่อท่าน
                      </p>
                    </div>
                  }
                />
              </label>
            </div>
          </div>
          <p>{THB(shuttle)}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center my-1 space-x-2">
            <Checkbox id="motocycle" disabled checked />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="motocycle"
                className="flex items-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <div>บริการเช่ามอเตอร์ไซค์</div>
                <HoverIcon
                  icon={<InfoIcon size={14} className="ml-1" />}
                  content={
                    <div>
                      <p>
                        รถมอเตอร์ไซค์ของทางรีสอร์ทมีบริการให้เช่า
                        สำหรับลูกค้าที่ต้องการใช้บริการ
                        โปรดแจ้งล่วงหน้าเพื่อให้ทางรีสอร์ทได้จัดเตรียมให้
                        หรือสามารถเช่าได้ที่เคาน์เตอร์ โดยจะมีค่าบริการเพิ่มเติม
                        350 บาทต่อวัน หรือ 1400 บาทต่อสัปดาห์
                      </p>
                    </div>
                  }
                />
              </label>
            </div>
          </div>
          <p>ติดต่อเมื่อเข้าพัก</p>
          {/* <p>{THB(motocycle)}</p> */}
        </div>
      </div>
      <div className="p-2 my-2 text-xs border rounded-md">
        <h1 className="mb-2 text-sm font-bold">สรุปราคาของคุณ</h1>
        <div className="grid grid-cols-2 p-2 bg-gray-200">
          <h1 className="text-2xl font-bold">ยอดรวม</h1>
          <div>
            <h2 className="text-xl font-bold">{totalPrice}</h2>
            <p>รวมภาษีและค่าธรรมเนียมแล้ว</p>
          </div>
        </div>
        <div>
          <h1 className="mt-2 mb-1 text-sm">ข้อมูลเกี่ยวกับราคา</h1>

          <div className="flex items-center justify-between">
            <p> ภาษีมูลค่าเพิ่ม (VAT) 7% </p>
            <p>{vatPrice}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <p>ค่าธรรมเนียม</p>
              <HoverIcon
                icon={<InfoIcon size={14} />}
                content={
                  <div>
                    <p>
                      รีสอร์ทขอบริการค่าประกันห้องพักเพื่อความปลอดภัยและการรักษาความสะอาดของห้องพัก
                      ท่านลูกค้าสามารถเพิ่มความมั่นใจในการพักผ่อนได้โดยการชำระค่าประกันที่จะคืนให้หลังจากการเช็คเอาท์
                    </p>
                  </div>
                }
              />
            </div>
            <p>{feePrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingInfo;
