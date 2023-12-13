import PageHeader from "@/components/pageheader/pageheader";
import { buttonVariants } from "@/components/ui/button";
import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import Link from "next/link";
import React from "react";
import {
  BiShower,
  BiSolidTShirt,
  BiSolidTree,
  BiSquare,
  BiUser,
} from "react-icons/bi";
import Image from "next/image";
import { Item } from "@radix-ui/react-navigation-menu";
import { notFound } from "next/navigation";
import ImageSlider from "@/components/slider";
// TODO: เขียน Desc ใหม่
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

function Roompage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const room = rooms.find((item) => item.slug === slug);

  if (!room) return notFound();

  return (
    <PageWrapper className="mt-20 ">
      <PageHeader
        title={room.name}
        disableTitle
        className="container"
        breadcrumb={[
          { title: "ห้องพักทั้งหมด", path: "/rooms" },
          { title: room.name, path: `/rooms/${room.slug}` },
        ]}
      />
      <ContainerWrapper className="flex flex-col justify-center items-center ">
        <ImageSlider
          images={[
            "/assets/rooms/room1.2.jpg",
            "/assets/rooms/room1.3.jpg",
            "/assets/rooms/room1.jpg",
          ]}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gad-4 my-8 w-full max-w-2xl">
          <div>
            <h2 className="text-xl font-bold">{room.name}</h2>
            <p className="text-sm font-bold">{room.price} บาท/คืน</p>
            <p className="text-xs">{room.desc}</p>
          </div>
          <div className="w-full ">
            <h2 className="text-2xl font-bold">ไฮไลท์</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 text-sm">
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
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default Roompage;
