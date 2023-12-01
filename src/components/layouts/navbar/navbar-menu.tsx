"use client";

import React from "react";
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
import { menu, room } from "@/configs/constant";

function NavbarMenu() {
  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>ห้องพัก</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-24">
              {room.map((item) => (
                <li className="p-2 hover:bg-gray-100 text-sm" key={item.name}>
                  {item.name}
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
