import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import Image from "next/image";
import PromotionsCard from "@/components/card/promotions-card";
import PageHeader from "@/components/pageheader/pageheader";

type PromotionType = {
  title: string;
  content: string;
  image: string;
  slug: string;
};

const promotions: PromotionType[] = [
  {
    title: "นาทีสุดท้าย",
    content:
      "ราคาดีที่สุดสำหรับการพักผ่อนที่มหาครเมืองสงขลา ที่พักในฝันสำหรับวันหยุดในเมือง",
    image: "/assets/imgpromotions/promotions1.jpg",
    slug: "last-minute",
  },
  {
    title: "แพ็กเกจ",
    content:
      "คลื่นแห่งการเฉลิมฉลอง: การเดินทางที่เต็มอิ่ม พบประสบการณ์สุดพิเศษกับแพ็คเกจซิกเนเจอร์ ในโอกาสครบรอบ",
    image: "/assets/imgpromotions/promotions2.jpg",
    slug: "package",
  },
  {
    title: "ห้องพักและอาหารเช้า",
    content: "SINGLA ช่วงเวลาดีดีแห่งความสุขตรงนี้ของคุณ",
    image: "/assets/imgpromotions/promotions3.jpg",
    slug: "room-breakfast",
  },
  {
    title: "ยิ่งพักนาน ยิ่งคุ้ม",
    content: "ยิ่งพักนาน ยิ่งคุ้ม พลาดไม่ได้กับข้อเสนอยิ่งพักนาน ยิ่งคุ้ม",
    image: "/assets/imgpromotions/promotions4.jpg",
    slug: "longer-stay",
  },
  {
    title: "ข้อเสนอห้องพัก",
    content:
      "พักก่อน จ่ายทีหลัง ผ่อนชำระแบบไม่มีดอกเบี้ย สำหรับผู้ถือบัตรที่ร่วมรายการ",
    image: "/assets/imgpromotions/promotions5.jpg",
    slug: "room-offers",
  },
  {
    title: "ดินเนอร์สุดโรแมนติก​",
    content:
      "เฉลิมฉลองความโรแมนติกในขณะที่ค้นพบอาหารค่ำสุดโรแมนติกกับคนสำคัญของคุณ",
    image: "/assets/imgpromotions/promotions6.jpg",
    slug: "romantic-dinner",
  },
];

function PromotionsPage() {
  return (
    <PageWrapper className="mt-20 ">
      <PageHeader
        title="โปรโมชั่นทั้งหมด"
        className="container"
        breadcrumb={[{ title: "โปรโมชั่น", path: "/promotions" }]}
      />
      <ContainerWrapper className="grid justify-center items-center">
        <div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid gap-2 mb-4">
          {promotions.map((promotion) => (
            <PromotionsCard {...promotion} key={promotion.slug} />
          ))}
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default PromotionsPage;
