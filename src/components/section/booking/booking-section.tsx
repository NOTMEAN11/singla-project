"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { BedSingle, Users } from "lucide-react";
import { toast } from "sonner";

import useBookingStore from "@/hooks/usebooking";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/combobox";
import { DatePickerWithRange } from "@/components/datepicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RoomType } from "@/types/room-type";

type Props = {
  roomtype: RoomType[];
};

function BookingSection({ roomtype }: Props) {
  const { checkInDate, checkOutDate, setRoom, room, guest, setGuest } =
    useBookingStore();

  const router = useRouter();

  function handleSubmit() {
    if (!room) {
      toast.error("โปรดเลือกประเภทห้องพัก");
      return;
    }

    if (!checkInDate || !checkOutDate) {
      toast.error("โปรดเลือกวันที่เข้าพักและวันที่ออก");
      return;
    }

    if (guest?.adults === 0) {
      toast.error("โปรดเลือกจำนวนผู้พัก");
      return;
    }

    router.push("/booking?step=details");
  }

  function handleRoomType(value: string) {
    setRoom(value);
  }

  let people = (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="flex justify-start w-full space-x-2 text-xs"
        >
          <Users size={14} />{" "}
          <p>
            {guest?.adults ? `ผู้ใหญ่ ${guest?.adults} คน ` : "ผู้เข้าพัก"}
            {guest?.children ? ` เด็ก ${guest?.children} คน` : ""}
          </p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2" align="start">
        <div className="flex items-center justify-between p-1">
          <p className="mx-4 text-sm">ผู้ใหญ่</p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="w-6 h-6"
              onClick={() => {
                setGuest({
                  adults: guest?.adults! - 1,
                  children: guest?.children!,
                });
              }}
              disabled={guest?.adults === 0}
            >
              -
            </Button>
            <p className="px-4 text-sm">{guest?.adults}</p>
            <Button
              variant="outline"
              className="w-6 h-6"
              onClick={() => {
                setGuest({
                  adults: guest?.adults! + 1,
                  children: guest?.children!,
                });
              }}
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between p-1">
          <p className="mx-4 text-sm">เด็ก</p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="w-6 h-6"
              onClick={() => {
                setGuest({
                  adults: guest?.adults!,
                  children: guest?.children! - 1,
                });
              }}
              disabled={guest?.children === 0}
            >
              -
            </Button>
            <p className="px-4 text-sm">{guest?.children}</p>
            <Button
              variant="outline"
              className="w-6 h-6"
              onClick={() => {
                setGuest({
                  adults: guest?.adults!,
                  children: guest?.children! + 1,
                });
              }}
              disabled={guest?.adults === 0}
            >
              +
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <>
      <div className="grid w-full grid-cols-1 p-2 space-y-2 border lg:hidden">
        <Combobox
          data={roomtype}
          placeholder="โปรดเลือกประเภทห้อง"
          className="max-w-full"
          icon={<BedSingle className="w-4 h-4 mr-2" />}
          fn={handleRoomType}
        />
        <DatePickerWithRange className="max-w-full" />
        {people}
        <Button
          variant="default"
          role="combobox"
          className="w-full"
          onClick={handleSubmit}
        >
          <p>ดำเนินการต่อ</p>
        </Button>
      </div>
      <div className="items-center justify-center hidden p-2 border lg:flex">
        <div className="flex items-center space-x-2">
          <Combobox
            data={roomtype}
            placeholder="โปรดเลือกประเภทห้อง"
            icon={<BedSingle className="w-4 h-4 mr-2" />}
            fn={handleRoomType}
          />
          <DatePickerWithRange />
          {people}
          <Button
            variant="default"
            role="combobox"
            className="w-[200px] ml-2"
            onClick={handleSubmit}
          >
            <p>ดำเนินการต่อ</p>
          </Button>
        </div>
      </div>
    </>
  );
}

export default BookingSection;
