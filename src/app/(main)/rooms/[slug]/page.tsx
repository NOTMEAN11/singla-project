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
import { THB } from "@/lib/utils";

async function GetData(slug: string) {
  const room = await db.roomType.findFirst({
    where: {
      slug: slug,
    },
  });

  return room;
}

async function Roompage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const room = await GetData(slug);

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
      <ContainerWrapper className="flex flex-col items-center justify-center ">
        <ImageSlider images={room.image} />
        <div className="grid w-full max-w-2xl grid-cols-1 my-8 md:grid-cols-2 gad-4">
          <div>
            <h2 className="text-xl font-bold">{room.name}</h2>
            <p className="text-sm font-bold">{THB(room.price)} /คืน</p>
            <p className="text-xs">{room.description}</p>
          </div>
          <div className="w-full ">
            <h2 className="text-2xl font-bold">ไฮไลท์</h2>
            <ul className="grid grid-cols-1 text-sm md:grid-cols-2">
              <li className="flex items-center space-x-1">
                <BiSolidTree /> <span>วิวทะเล</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiSquare /> <span>ขนาดห้อง :{26 * room.capacity} ตร.ม</span>
              </li>
              <li className="flex items-center space-x-1">
                <BiUser /> <span>จำนวนคน {room.capacity} คน</span>
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
