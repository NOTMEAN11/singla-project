"use client";
import { buttonVariants } from "@/components/ui/button";

import useBookingStore from "@/hooks/usebooking";
import { RoomType } from "@/types/room-type";
import { format } from "date-fns";
import { th } from "date-fns/locale/th";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  roomtype: RoomType[];
};

function ConfirmBookingDetail({ roomtype }: Props) {
  const { checkInDate, checkOutDate, room, guest, fee, options, setOptions } =
    useBookingStore();

  const ROOM_TYPE = roomtype?.find((item) => item.id === room);

  const router = useRouter();

  return (
    <div className="p-2 my-4 text-xs border rounded-md ">
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
          <p className="font-semibold text-gray-950">ผู้ใหญ่</p>
          <p className="text-gray-950">{guest?.adults} คน</p>
        </div>
        <div className="grid grid-cols-2 ">
          <p className="font-semibold text-gray-950">เด็ก</p>
          <p className="text-gray-950">{guest?.children} คน</p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBookingDetail;
