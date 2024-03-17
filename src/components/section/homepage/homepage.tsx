"use client";
import Accordions from "@/components/accordions";
import RoomCard from "@/components/card/room-card";
import { Faq, RoomType } from "@prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

type HomeSectionProps = {
  roomType: RoomType[];
  faqs: Faq[];
};

const variants = {
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
};

function HomeSection({ roomType, faqs }: HomeSectionProps) {
  return (
    <motion.div>
      <motion.div
        variants={variants}
        initial="init"
        whileInView="inview"
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center mt-48 mb-20"
      >
        <h1 className="text-4xl text-yellow-600">สิงหลา รีสอร์ท</h1>
        <p className="text-yellow-400">
          พบบรรยากาศทันสมัยและไม่เหมือนใครที่นี้
        </p>
        <Separator className="my-2 w-80" />
        <div className="w-3/4 mt-5">
          <p className="w-full text-center text-gray-400">
            ที่ SINGLA เรามีห้องพักที่ออกแบบมีความสวยงามและสะดวกสบาย
            ทุกห้องสามารถชมวิวทะเลหรือวิวธรรมชาติรอบๆ ได้.
            ห้องพักมีสิ่งอำนวยความสะดวกทั้งหมดที่คุณต้องการสำหรับการพักผ่อนที่สบาย
            และ รีสอร์ทตั้งอยู่ใกล้กับหลายสถานที่ท่องเที่ยวที่น่าสนใจ เช่น
            เกาะหนูเกาะแมว, ทะเลสาบสงขลา, สวนสัตว์สงขลา
          </p>
        </div>
        <Separator className="mt-8 w-72" />
      </motion.div>
      <motion.div
        variants={variants}
        initial="init"
        whileInView="inview"
        viewport={{ once: true }}
      >
        <Image
          src="/assets/placeholders/1400x200.svg"
          alt="400"
          width={1400}
          height={200}
        />
      </motion.div>
      <div className="mt-24 mb-20 ">
        <motion.div
          variants={variants}
          initial="init"
          whileInView="inview"
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center mb-6"
        >
          <h1 className="text-4xl text-yellow-600">ห้องพัก</h1>
          <p className="text-yellow-400">
            พบบรรยากาศทันสมัยและไม่เหมือนใครที่นี้
          </p>
          {/* <Separator className="my-2 w-80" /> */}
        </motion.div>
        <motion.div
          variants={variants}
          initial="init"
          whileInView="inview"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-4 my-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center"
        >
          {roomType.map((room) => (
            <RoomCard
              name={room.name}
              price={room.price}
              image={room.image[0]}
              slug={room.slug}
              key={room.slug}
              className="w-full"
            />
          ))}
        </motion.div>
        <div className="mt-24 mb-20">
          <div className="flex flex-col items-center justify-center mb-6">
            <h1 className="text-4xl text-yellow-600">คำถามที่พบบ่อย</h1>
          </div>
          <Accordions Faq={faqs} />
        </div>
      </div>
    </motion.div>
  );
}

export default HomeSection;
