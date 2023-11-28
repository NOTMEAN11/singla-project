"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import NavbarMenu from "./navbar-menu";
import Link from "next/link";
function Navbar() {
  return (
    <div className="flex justify-between items-center py-4 font-bold">
      <h1 className="text-3xl font-black">Singla</h1>
      <NavbarMenu />
      <Link href="/booking" className={buttonVariants()}>
        จองเลย
      </Link>
    </div>
  );
}

export default Navbar;
