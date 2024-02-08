"use client";
import { buttonVariants } from "@/components/ui/button";
import { roomtype } from "@/configs/constant";
import useBookingStore from "@/hooks/usebooking";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function ConfirmBookingDetail() {
  const { checkInDate, checkOutDate, room, guest, fee, options, setOptions } =
    useBookingStore();

  const router = useRouter();
  const ROOM_TYPE = roomtype.find((item) => item.id === room);
  return (
    <div className="p-2 border rounded-md text-xs my-4 ">
      <h1 className=" font-bold mb-2 text-sm">รายละเอียดการจอง</h1>
      <div className="flex flex-col space-y-2">
        <div className="grid grid-cols-2">
          <p className="text-gray-950 font-semibold">ประเภทห้องพัก</p>
          <Link
            href={"/"}
            className="text-gray-950 hover:text-blue-500 hover:underline"
          >
            {ROOM_TYPE?.name}
          </Link>
        </div>
        <div className="grid grid-cols-2">
          <div className="">
            <p className="text-gray-950 font-semibold">เช็คอิน</p>
            <p className="text-gray-950">
              {format(checkInDate!, "dd MMM yyyy", {
                locale: th,
              })}
            </p>
            <p>14:00 น. – 23:30 น.</p>
          </div>
          <div className="">
            <p className="text-gray-950 font-semibold">เช็คเอ้าท์</p>
            <p className="text-gray-950">
              {format(checkOutDate!, "dd MMM yyyy", { locale: th })}
            </p>
            <p>00:00 น. – 11:30 น.</p>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <p className="text-gray-950 font-semibold">ผู้ใหญ่</p>
          <p className="text-gray-950">{guest?.adults} คน</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p className="text-gray-950 font-semibold">เด็ก</p>
          <p className="text-gray-950">{guest?.children} คน</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBookingDetail;
