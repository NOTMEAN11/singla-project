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
import { buttonVariants } from "@/components/ui/button";

function NavbarDrawer() {
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
              <Link href="/rooms">ห้องพักทั้งหมด</Link>
            </li>
            <li className="p-2 text-sm hover:bg-gray-100">
              <Link href="/promotions">โปรโมชั่น</Link>
            </li>
            <li className="p-2 text-sm hover:bg-gray-100">
              <Link href="/contact-us">ติดต่อเรา</Link>
            </li>

            <li className={buttonVariants({ className: "w-full mt-1" })}>
              <Link href="/booking">จองเลย</Link>
            </li>
          </ul>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default NavbarDrawer;
