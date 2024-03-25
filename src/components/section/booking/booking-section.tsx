"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { BedSingle, InfoIcon, Users, Utensils } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { RoomType } from "@/types/room-type";

import { THB } from "@/lib/utils";
import { BiShower, BiSolidTShirt, BiSquare } from "react-icons/bi";
import HoverIcon from "@/components/hover-icon";

type Props = {
  roomtype: RoomType[];
};

type RoomResponse = {
  id: string;
  name: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  roomTypeId: string;
  roomType: RoomType;
};

function BookingSection({ roomtype }: Props) {
  const { checkInDate, checkOutDate, setRoom, room, guest, setGuest } =
    useBookingStore();

  const router = useRouter();
  const [rooms, setRooms] = useState<RoomResponse[]>([] as RoomResponse[]);

  async function handleSubmit() {
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
    const res = await fetch("/api/booking/checking-room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        room: room,
      }),
    });

    const data = await res.json();
    if (data.status === "error") {
      toast.error(data.message);
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

  useEffect(() => {
    async function fetchRooms(
      room: string,
      checkInDate: Date | undefined,
      checkOutDate: Date | undefined
    ) {
      if (!room || !checkInDate || !checkOutDate) {
        return;
      }

      const checkIn = checkInDate.getTime();
      const checkOut = checkOutDate.getTime();

      const res = await fetch(
        `/api/roomtypes?type=${room}&checkIn=${checkIn}&checkOut=${checkOut}`
      );

      if (!res.ok) {
        setRooms([]);
        return;
      }

      const data = await res.json();

      if (data.status === "not-found") {
        setRooms([]);
        return;
      }
      setRooms(data);
    }
    fetchRooms(room!, checkInDate, checkOutDate);
  }, [room, checkInDate, checkOutDate]);

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
      {room !== "" && (
        <div className="w-full p-4 my-4 border">
          {rooms.length === 0 ? (
            <p className="flex items-center justify-center h-32">
              ขออภัย ไม่พบห้องพักที่ว่างในช่วงเวลาดังกล่าว
            </p>
          ) : (
            <Table>
              <TableCaption>รายการห้องพัก</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-32">หมายเลขห้องพัก</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ราคา</TableHead>
                  <TableHead>จำนวนผู้เข้าพัก</TableHead>
                  <TableHead>สิ่งอำนวยความสะดวก</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rooms?.map((room) => (
                  <TableRow key={room.id}>
                    <TableCell className="font-medium">{room.name}</TableCell>
                    <TableCell>
                      {room.status === "available" && "ว่าง"}
                    </TableCell>
                    <TableCell>{THB(room.roomType.price)} / คืน</TableCell>
                    <TableCell>{room.roomType.capacity} คน</TableCell>
                    <TableCell>
                      <ul className="grid grid-cols-1 text-sm">
                        <li className="flex items-center space-x-1">
                          <BiSquare />{" "}
                          <span>
                            ขนาดห้อง :{26 * room.roomType.capacity} ตร.ม
                          </span>
                        </li>

                        <li className="flex items-center space-x-1">
                          <BiShower /> <span>ผักบัวและอ่างอาบน้ำ</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <BiSolidTShirt /> <span>ชุดคลุมอาบน้ำ</span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <Utensils size={14} />{" "}
                          <span className="flex items-center space-x-1">
                            บุฟเฟ่ต์เช้า (ไม่บังคับ)
                            <HoverIcon
                              icon={<InfoIcon size={14} className="ml-1" />}
                              content={
                                <div>
                                  <p>
                                    บุฟเฟ่ต์เช้าของทางรีสอร์ทมีบริการให้เลือกหลากหลายเมนู
                                    สำหรับลูกค้าที่ต้องการใช้บริการ
                                    โปรดแจ้งล่วงหน้าเพื่อให้ทางรีสอร์ทได้จัดเตรียมให้
                                    หรือสามารถเลือกได้ที่เคาน์เตอร์
                                    โดยจะมีค่าบริการเพิ่มเติม 199 บาทต่อท่าน
                                    หรือ 99 บาทสำหรับเด็ก
                                  </p>
                                </div>
                              }
                            />
                          </span>
                        </li>
                        <li className="flex items-center space-x-1">
                          <Utensils size={14} />{" "}
                          <span className="flex items-center space-x-1">
                            รถรับ-ส่งสนามบิน (ไม่บังคับ){" "}
                            <HoverIcon
                              icon={<InfoIcon size={14} className="ml-1" />}
                              content={
                                <div>
                                  <p>
                                    มีบริการรถรับ-ส่งสนามบินสนามบินภูเก็ต
                                    โดยจะมีค่าบริการเพิ่มเติม 300 บาทต่อท่าน
                                    สำหรับเด็ก 150 บาทต่อท่าน
                                  </p>
                                </div>
                              }
                            />
                          </span>
                        </li>
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      )}
    </>
  );
}

export default BookingSection;
