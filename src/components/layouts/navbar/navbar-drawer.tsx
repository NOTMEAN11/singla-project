"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BiMenu } from "react-icons/bi";
import Link from "next/link";
import { RoomType } from "@prisma/client";

function NavbarDrawer() {
  const [roomtype, setRoomType] = useState<RoomType[]>([]);

  useEffect(() => {
    fetch("/api/roomtypes")
      .then((res) => res.json())
      .then((data) => {
        setRoomType(data);
      });
  }, []);
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <BiMenu className="text-3xl" />
      </SheetTrigger>
      <SheetContent className="z-[9999]">
        <SheetHeader className="text-left">
          <SheetTitle className="p-2">SINGLA</SheetTitle>
          <ul>
            <li className="p-2 text-sm hover:bg-gray-100">
              <Link href="/rooms">ห้องพัก</Link>
            </li>
            {roomtype.map((item) => (
              <li className="p-2 text-sm hover:bg-gray-100" key={item.name}>
                <Link href={"/rooms/" + item.slug}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarDrawer;
