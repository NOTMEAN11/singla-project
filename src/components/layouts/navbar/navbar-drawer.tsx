import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BiMenu } from "react-icons/bi";
import { menu } from "@/configs/constant";
import Link from "next/link";

function NavbarDrawer() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden block">
        <BiMenu className="text-3xl" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle className="p-2">SINGLA</SheetTitle>
          <ul>
            <li className="p-2 hover:bg-gray-100 text-sm">
              <Link href="/rooms">ห้องพัก</Link>
            </li>
            {menu.map((item) => (
              <li className="p-2 hover:bg-gray-100 text-sm" key={item.name}>
                <Link href={item.Link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarDrawer;
