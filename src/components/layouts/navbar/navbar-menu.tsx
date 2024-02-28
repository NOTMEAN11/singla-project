"use client";

import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { room, menu } from "@/configs/constant";
import { RoomType } from "@prisma/client";

function NavbarMenu() {
  const [roomtype, setRoomType] = useState<RoomType[]>([]);

  useEffect(() => {
    fetch("/api/roomtypes")
      .then((res) => res.json())
      .then((data) => {
        setRoomType(data);
      });
  }, []);
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>ห้องพัก</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-24">
              {roomtype.map((item) => (
                <li
                  className="p-2 text-xs font-normal hover:bg-gray-100"
                  key={item.name}
                >
                  <Link href={"/rooms/" + item.slug}>
                    {item.name.split("ROOM").join("")}
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {menu.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              asChild
            >
              <Link href={item.Link}>{item.name}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default NavbarMenu;
