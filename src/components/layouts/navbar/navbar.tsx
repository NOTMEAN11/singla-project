"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import NavbarMenu from "./navbar-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavbarDrawer from "./navbar-drawer";

function Navbar() {
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-[9998]">
      <div className="flex justify-between items-center py-4 font-bold container">
        <Link href="/" className="text-3xl font-bold uppercase">
          Singla
        </Link>
        <NavbarMenu />
        <Link
          href="/booking"
          className={cn(buttonVariants(), "hidden md:flex ")}
        >
          จองเลย
        </Link>
        <NavbarDrawer />
      </div>
    </div>
  );
}

export default Navbar;
