import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import Image from "next/image";
import PromotionsCard from "@/components/card/promotions-card";
import PageHeader from "@/components/pageheader/pageheader";
import { notFound } from "next/navigation";

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

function PromotionPage({ params }: { params: { slug: string } }) {
  const promotion = promotions.find(
    (promotion) => promotion.slug === params.slug
  );

  if (!promotion) {
    return notFound();
  }
  return (
    <PageWrapper className="mt-20">
      <PageHeader
        title={promotion.title}
        disableTitle
        className="container"
        breadcrumb={[
          { title: "โปรโมชั่น", path: "/promotions" },
          { title: promotion.title, path: `/promotions/${promotion.slug}` },
        ]}
      />
      <ContainerWrapper>
        <div>
          <h1 className="text-3xl font-bold">{promotion.title}</h1>
          <p>{promotion.content}</p>
          <ul className="ml-5 list-disc">
            <li>Lorem, ipsum.</li>
            <li>Lorem, ipsum.</li>
            <li>Lorem, ipsum.</li>
          </ul>
          <p>
            <span className="font-bold">
              ระยะการจอง : 10 ธันวาคม, 2020 - 31 ธันวาคม 2023
            </span>
          </p>
          <p>
            <span className="font-bold">คูปองลดส่วน </span>: SEPELGQWXL23
          </p>
          <div>
            <h2 className="font-bold">ข้อกำหนดและเงื่อนไข</h2>
            <p>
              โปรดชำระเงินเต็มจำนวนที่โรงแรม
              การจองห้องพักนี้ไม่สามารถบอกยกเลิกหรือปรับเปลี่ยนได้
              ในกรณีที่ไม่มาเข้าพัก จะคิดค่าปรับเป็นเวลา 1 คืน
              ราคาตามโปรแกรมเฟล็กซี่ เบสต์ อะเวเลเบิ้ล (ไม่รวมค่าบริการและภาษี)
            </p>
          </div>
          <div>
            <h2 className="font-bold text-lg">ข้อกำหนดทั่วไปและเงื่อนไข</h2>
            <ul className="list-disc ml-5">
              <li>
                ราคานี้เป็นราคาต่อห้องต่อคืนและยังไม่รวมค่าบริการ 10%
                และภาษีมูลค่าเพิ่ม 7%
              </li>
              <li>
                ราคานี้เป็นราคาสำหรับการจองส่วนบุคคลเท่านั้นและขึ้นอยู่กับห้องพักที่ว่าง
                ณ ขณะทำการจอง
              </li>
              <li>ราคานี้ไม่สามารถใช้ร่วมกับโปรโมชั่นอื่นๆ ได้</li>
              <li>ราคานี้อาจมีการเปลี่ยนแปลงได้ตามความพร้อมของรีสอร์ท</li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold text-lg">
              นโยบายการชำระเงิน การยกเลิก การแก้ไข และการไม่เข้าพัก:
            </h2>
            <ul className="list-disc ml-5">
              <li>
                ทุกการจองต้องใช้หมายเลขบัตรเครดิตที่ใช้งานได้ตลอดการเข้าพักเป็นการรับประกันการจอง
              </li>
              <li>
                หากการจองห้องพักถูกยกเลิกก่อนการเข้าพักก่อนวันเข้าพักน้อย 24
                ชั่วโมงจะมีการเรียกเก็บค่าห้อง 1 คืน
              </li>
              <li>
                ในกรณีที่ไม่มาเข้าพักหรือเข้าพักน้อยกว่าหรือเร็วกว่ากำหนด
                จะมีการเรียกเก็บค่าห้อง 1 คืน
              </li>
              <li>
                การแก้ไขการสำรองห้องพักสามารถทำได้โดยขึ้นอยู่กับห้องพักที่ว่าง ณ
                ขณะทำการจอง
              </li>
            </ul>
          </div>
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default PromotionPage;
