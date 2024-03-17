"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Variants, motion, useAnimationControls } from "framer-motion";
import {
  BarChart3,
  BedSingle,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  HomeIcon,
  LogOut,
  Settings,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { ModeToggle } from "../../toggle-theme";

const variants: Variants = {
  close: {
    width: 100,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  open: {
    width: 448,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const menu = [
  {
    title: "หน้าหลัก",
    icon: <HomeIcon size={14} />,
    link: "/",
  },
  {
    title: "ห้องพัก",
    icon: <BedSingle size={14} />,
    link: "/booking",
  },
  {
    title: "การจอง",
    icon: <CalendarDays size={14} />,
    link: "/booking",
  },
  {
    title: "รายงาน",
    icon: <BarChart3 size={14} />,
    link: "/report",
  },
  {
    title: "ตั้งค่า",
    icon: <Settings size={14} />,
    link: "/setting",
  },
];

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.aside
      variants={variants}
      animate={isOpen ? "open" : "close"}
      className="w-full h-screen max-w-[15rem] relative border-r overflow-y-auto"
    >
      <div className="flex items-center justify-between p-4 border-b ">
        <div
          className="font-bold cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-xs">ระบบจัดการ</p>
          SINGLA
        </div>

        {isOpen ? (
          <ChevronsLeft
            size={14}
            className={cn("cursor-pointer")}
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <ChevronsRight
            size={14}
            className={cn(!isOpen && "hidden", "cursor-pointer")}
          />
        )}
      </div>
      {isOpen && (
        <div className="h-full ">
          {menu.map((item, index) => (
            <Link
              key={index}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "flex items-center justify-start w-full"
              )}
              href={"/backoffice" + item.link}
            >
              {item.icon} <h4 className="ml-2">{item.title}</h4>
            </Link>
          ))}
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "flex items-center justify-start w-full cursor-pointer"
            )}
            onClick={() => signOut()}
          >
            <LogOut size={14} /> <h4 className="ml-2">ออกจากระบบ</h4>
          </div>
          <ModeToggle />
        </div>
      )}
    </motion.aside>
  );
}

export default SideBar;
