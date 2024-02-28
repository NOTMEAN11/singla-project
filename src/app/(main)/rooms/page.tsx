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
import { THB } from "@/lib/utils";

async function getRoomType() {
  const room = await db.roomType.findMany();
  return room;
}

async function RoomsPage() {
  const rooms = await getRoomType();
  return (
    <PageWrapper className="mt-20 ">
      <PageHeader
        title="ห้องทั้งหมด"
        className="container"
        breadcrumb={[{ title: "ห้องพักทั้งหมด", path: "/rooms" }]}
      />
      <ContainerWrapper className="grid grid-cols-1 gap-4 justify-items-center">
        {rooms.map((item) => (
          <div
            key={item.slug}
            className="grid w-full max-w-6xl grid-cols-1 gap-4 p-4 border md:grid-cols-2 justify-items-center "
          >
            <Image
              src={item.image[0]}
              alt={item.slug}
              width={400}
              height={400}
              className="object-cover w-full h-72 md:h-80"
            />
            <div className="w-full max-w-lg ">
              <h2>{item.name}</h2>
              <p>{THB(item.price)}</p>
              <p className="text-sm">{item.description}</p>
              <div className="my-4">
                <h2>ไฮไลท์</h2>
                <ul className="grid grid-cols-2 text-sm">
                  <li className="flex items-center space-x-1">
                    <BiSolidTree /> <span>วิวทะเล</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <BiSquare />{" "}
                    <span>ขนาดห้อง :{26 * item.capacity} ตร.ม</span>
                  </li>
                  <li className="flex items-center space-x-1">
                    <BiUser /> <span>จำนวนคน {item.capacity} คน</span>
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
