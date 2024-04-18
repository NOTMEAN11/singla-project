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
  Image,
  LogOut,
  Settings,
  Tags,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

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
    link: "/rooms",
  },
  {
    title: "การจอง",
    icon: <CalendarDays size={14} />,
    link: "/booking",
  },

  {
    title: "คลังภาพ",
    // eslint-disable-next-line jsx-a11y/alt-text
    icon: <Image size={14} />,
    link: "/image",
  },
  {
    title: "โปรโมชั่น",
    icon: <Tags size={14} />,
    link: "/promotion",
  },
];

function SideBar() {
  const path = usePathname();
  const pathName = path.split("backoffice")[1];
  const session = useSession();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.aside
      variants={variants}
      initial="close"
      animate={isOpen ? "open" : "close"}
      className="w-full h-full min-h-screen max-w-[15rem] border-r bg-primary-foreground"
    >
      <div className="flex items-center justify-between p-4 border-b ">
        <button
          disabled={session.status !== "authenticated"}
          className="font-bold"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-xs">ระบบจัดการ</p>
          SINGLA
        </button>

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
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="h-full "
        >
          {menu.map((item, index) => (
            <Link
              key={index}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "flex items-center justify-start w-full",
                pathName === item.link && "bg-accent"
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
        </motion.div>
      ) : (
        <div className="h-full ">
          {menu.map((item, index) => (
            <Link
              key={index}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "flex items-center ",
                pathName === item.link && "bg-accent",
                !session.data && "hidden"
              )}
              href={"/backoffice" + item.link}
            >
              {item.icon}
            </Link>
          ))}
          <div
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
              "flex items-center cursor-pointer",
              !session.data && "hidden"
            )}
            onClick={() => signOut()}
          >
            <LogOut size={14} />
          </div>
        </div>
      )}
    </motion.aside>
  );
}

export default SideBar;
