import HeroSection from "@/components/section/herosection";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/wrapper/page-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import RoomCard from "@/components/card/room-card";
import Footer from "@/components/layouts/footer/footer";
import ContainerWrapper from "@/components/wrapper/container-wrapper";
import Accordions from "@/components/accordions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Room = {
  price: number;
  name: string;
  image: string;
  slug: string;
};

type faqs = {
  title: string;
  content: string;
  slug: string;
};

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
  {
    name: "POOL SUITE",
    price: 4000,
    image: "/assets/rooms/room4.2.jpg",
    slug: "pool-suite",
  },
];

const Faq: faqs[] = [
  {
    title:
      "SINGLA รีสอร์ท สามารถเลื่อนการเข้าพักได้หรือไม่? มีค่าใช้จ่ายเพิ่มเติมหรือไม่?",
    content:
      "หากคุณทำการจองผ่านเว็บไซด์ของรีสอร์ท คุณสามารถเลื่อนวันเข้าพักผ่านเว็บไซด์ของรีสอร์ทได้ ขึ้นอยู่กับข้อกำหนดและเงื่อนไขของโปรโมชั่นที่ระบุในการจองของคุณ สำหรับการจองผ่านช่องทางอื่นๆ ต้องทำการยกเลิกผ่านช่องทางนั้นเท่านั้น",
    slug: "faded-stay",
  },
  {
    title: "เวลาเช็คอินและเช็คเอาท์ ของ SINGLA รีสอร์ท?",
    content: "เช็คอินเวลา 14.00 น. เช็คเอ๊าท์เวลา 12.00 น.",
    slug: "check-in-out",
  },
  {
    title: "ให้บริการอาหารเช้าที่ใหน ตั้งแต่เวลากี่โมง?",
    content:
      "บุฟเฟ่ต์อาหารเช้าให้บริการที่ห้องเฮอลิเทจ คาเฟ่ ชั้นล๊อบบี้ ตั้งแต่เวลา 06.00 - 10.00 น.",
    slug: "food",
  },
  {
    title: "ราคาที่แสดงบนเว็บไซด์เป็นราคาก่อนหรือหลังลดราคาแล้ว?",
    content:
      "ราคาที่แสดงบนเว็บไซด์เป็นราคาที่ลดราคาแล้ว โดยไม่มีค่าใช้จ่ายเพิ่มเติมอื่นๆ และค่าธรรมเนียมการจองใดๆ อีก เมื่อทำการจองผ่านเว็บไซด์ของโรงแรม",
    slug: "price",
  },
];

export default async function Home() {
  return (
    <PageWrapper>
      <ContainerWrapper>
        <HeroSection />
        <div className="flex flex-col items-center justify-center mt-24 mb-20">
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
            {/* <Separator className="my-2 w-80" /> */}
          </div>
          <div className="grid grid-cols-1 gap-4 my-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
            {rooms.map((room) => (
              <RoomCard
                name={room.name}
                price={room.price}
                image={room.image}
                slug={room.slug}
                key={room.slug}
                className="w-full"
              />
            ))}
          </div>
          <div className="mt-24 mb-20">
            <div className="flex flex-col items-center justify-center mb-6">
              <h1 className="text-4xl text-yellow-600">คำถามที่พบบ่อย</h1>
            </div>
            <Accordions Faq={Faq} />
          </div>
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}
