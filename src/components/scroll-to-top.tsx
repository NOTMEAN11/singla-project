"use client";
import React, { useEffect, useState } from "react";
import { Variants, motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowUp } from "lucide-react";

const variants: Variants = {
  init: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.5 },
  },
  inview: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

function ScrollToTop() {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);
  return (
    <motion.div
      variants={variants}
      initial="init"
      exit="exit"
      animate={isScrolling ? "inview" : "exit"}
      className={isScrolling ? "fixed bottom-4 right-4" : "hidden"}
    >
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        size="sm"
        className="bg-yellow-500 hover:bg-yellow-600"
      >
        <ArrowUp />
      </Button>
    </motion.div>
  );
}

export default ScrollToTop;
