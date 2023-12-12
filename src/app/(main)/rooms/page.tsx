import PromotionsCard from "@/components/card/promotions-card";
import PageHeader from "@/components/pageheader/pageheader";
import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import Image from "next/image";
import {
  BiShower,
  BiSolidTShirt,
  BiSolidTree,
  BiSquare,
  BiUser,
} from "react-icons/bi";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
const rooms = [
  {
    name: "SUPERIOR ROOM",
    price: 1500,
    image: "/assets/rooms/room1.2.jpg",
    desc: "ห้องสุพีเรียร์สวีทคลับของเรามีพื้นที่กว้างขวางสำหรับการพักผ่อน ",
    slug: "superior-room",
  },
  {
    name: "DELUXE ROOM",
    price: 2000,
    image: "/assets/rooms/room2.2.jpg",
    desc: "ห้องดีลักซ์ของเราผสมผสานความสะดวกสบายร่วมสมัย มีทั้งทิวทัศน์ทะเลอันน่าทึ่ง",
    slug: "deluxe-room",
  },
  {
    name: "FAMILY ROOM",
    price: 3000,
    image: "/assets/rooms/room3.jpg",
    desc: "เข้าพักและเล่นในห้องเอ็กเซ็กคูทีฟ",
    slug: "family-room",
  },
  {
    name: "POOL SUITE",
    price: 4000,
    image: "/assets/rooms/room4.2.jpg",
    desc: "Pool Suite ของเราให้ความรู้สึกเป็นส่วนตัวมากยิ่งขึ้น",
    slug: "pool-suite",
  },
];

function RoomsPage() {
  return (
    <PageWrapper className="mt-20 ">
      <PageHeader
        title="ห้องทั้งหมด"
        className="container"
        breadcrumb={[{ title: "ห้องพักทั้งหมด", path: "/rooms" }]}
      />
      <ContainerWrapper className="flex flex-col justify-center items-center">
        {rooms.map((item) => (
          <div
            key={item.slug}
            className="flex justify-center gap-4 py-4 border-b w-full max-w-6xl"
          >
            <Image src={item.image} alt={item.slug} width={400} height={400} />
            <div className="w-full max-w-lg">
              <h2>{item.name}</h2>
              <p>{item.price}</p>
              <p className="text-sm">{item.desc}</p>
              <div className="my-4">
                <h2>ไฮไลท์</h2>
                <ul className="grid grid-cols-2 text-sm">
                  <li className="flex items-center space-x-1">
                    <BiSolidTree /> <span>วิวทะเล</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <BiSquare /> <span>ขนาดห้อง :54 ตร.ม</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <BiUser /> <span>จำนวนคน 4 คน</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <BiShower /> <span>ผักบัวและอ่างอาบน้ำ</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <BiSolidTShirt /> <span>ชุดคลุมอาบน้ำ</span>
                  </li>
                </ul>
              </div>
              <div className="space-x-2">
                <Link href="/booking" className={buttonVariants()}>
                  จองเลย
                </Link>
                <Link
                  href={`/rooms/${item.slug}`}
                  className={buttonVariants({ variant: "outline" })}
                >
                  ดูรายละเอียด
                </Link>
              </div>
            </div>
          </div>
        ))}
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default RoomsPage;
