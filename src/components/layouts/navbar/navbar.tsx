"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import React from "react";
import NavbarMenu from "./navbar-menu";
import Link from "next/link";
import { cn } from "@/lib/utils";
import NavbarDrawer from "./navbar-drawer";
import { Variants, motion } from "framer-motion";

const variants: Variants = {
  init: {
    y: -100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

function Navbar() {
  return (
    <motion.div
      variants={variants}
      initial="init"
      animate="animate"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed top-0 left-0 w-full bg-white z-[9998]"
    >
      <div className="container flex items-center justify-between py-4 font-bold">
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
    </motion.div>
  );
}

export default Navbar;
