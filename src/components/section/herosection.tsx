"use client";
import React from "react";
import Image from "next/image";
import { Variants, motion } from "framer-motion";

const variants: Variants = {
  init: {
    y: 200,
    opacity: 0,
    transition: { duration: 0.5, ease: "easeInOut", delay: 0.5 },
  },
  animate: {
    opacity: 1,
    y: 150,
    transition: { duration: 1, ease: "easeInOut", delay: 0.5 },
  },
};

function HeroSection() {
  return (
    <React.Fragment>
      <motion.div
        variants={variants}
        initial="init"
        animate="animate"
        className="mt-4 mb-4 overflow-hidden"
      >
        <h1 className="max-w-6xl mb-8 text-4xl font-medium text-gray-600 uppercase sm:text-8xl">
          พบประสบการณ์ที่ไม่เหมือนใครที่{" "}
          <span className="font-bold text-gray-800 underline underline-offset-4">
            SINGLA
          </span>{" "}
          ครบทุกความต้องการของคุณ
        </h1>
        <Image
          src={"/assets/bgs/bg.jpg"}
          alt="404"
          width={1400}
          height={500}
          className="object-cover w-full h-[600px]"
        />
      </motion.div>
    </React.Fragment>
  );
}
export default HeroSection;
