import HeroSection from "@/components/section/herosection";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/wrapper/page-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import RoomCard from "@/components/room-card";

type Room = {
  price: number;
  name: string;
  image: string;
  slug: string;
};

// TODO: เพิ่มข้อมูลห้องที่ 4

const rooms: Room[] = [
  {
    name: "SUPERIOR ROOM",
    price: 1500,
    image: "/assets/rooms/room1.2.jpg",
    slug: "superior-room",
  },
  {
    name: "DELUXE ROOM",
    price: 2000,
    image: "/assets/rooms/room2.2.jpg",
    slug: "deluxe-room",
  },
  {
    name: "FAMILY ROOM",
    price: 3000,
    image: "/assets/rooms/room3.jpg",
    slug: "family-room",
  },
];

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <div className="items-center justify-center flex flex-col mt-24 mb-20">
        <h1 className="text-4xl text-yellow-600">สิงหลา รีสอร์ท</h1>
        <p className="text-yellow-400">
          พบบรรยากาศทันสมัยและไม่เหมือนใครที่นี้
        </p>
        <Separator className="w-80 my-2" />
        <div className="mt-5 w-3/4">
          <p className="text-center  text-gray-400 w-full">
            ที่ SINGLA เรามีห้องพักที่ออกแบบมีความสวยงามและสะดวกสบาย
            ทุกห้องสามารถชมวิวทะเลหรือวิวธรรมชาติรอบๆ ได้.
            ห้องพักมีสิ่งอำนวยความสะดวกทั้งหมดที่คุณต้องการสำหรับการพักผ่อนที่สบาย
            และ รีสอร์ทตั้งอยู่ใกล้กับหลายสถานที่ท่องเที่ยวที่น่าสนใจ เช่น
            เกาะหนูเกาะแมว, ทะเลสาบสงขลา, สวนสัตว์สงขลา
          </p>
        </div>
        <Separator className="w-72 mt-8" />
      </div>
      <Image
        src="/assets/placeholders/1400x200.svg"
        alt="400"
        width={1400}
        height={200}
      />
      <div className="mt-24 mb-20 ">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-4xl text-yellow-600">ห้องพัก</h1>
          <p className="text-yellow-400">
            พบบรรยากาศทันสมัยและไม่เหมือนใครที่นี้
          </p>
          {/* <Separator className="w-80 my-2" /> */}
        </div>
        <div className="my-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-4">
          {rooms.map((room) => (
            <RoomCard
              name={room.name}
              price={room.price}
              image={room.image}
              slug={room.slug}
              key={room.slug}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
