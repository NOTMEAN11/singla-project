import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import Image from "next/image";

function PromotionsPage() {
  return (
    <PageWrapper className="mt-20">
      <h1 className="flex justify-center items-center uppercase font-bold my-24">
        promotions singla
      </h1>
      <ContainerWrapper className="grid justify-center items-center">
        <div className="grid-cols-3 grid">
          <div className="relative">
            <p className="absolute text-white font-bold text-md">นาทีสุดท้าย</p>
            <Image
              src="/assets/imgpromotions/promotions1.jpg"
              alt="400x200"
              width={400}
              height={200}
            />
            <p className="absolute bottom-1 text-white font-bold text-md">
              ราคาดีที่สุดสำหรับการพักผ่อนที่มหาครเมืองกรุงเทพ
              ที่พักในฝันสำหรับวันหยุดในเมือง
            </p>
          </div>
          <div className="relative">
            <p className="absolute text-white font-bold text-md">แพ็กเกจ</p>
            <Image
              src="/assets/imgpromotions/promotions2.jpg"
              alt="400x200"
              width={400}
              height={200}
            />
            <p className="absolute bottom-1 text-white font-bold">
              คลื่นแห่งการเฉลิมฉลอง: การเดินทางที่เต็มอิ่ม
              <p></p>
              <span>
                พบประสบการณ์สุดพิเศษกับแพ็คเกจซิกเนเจอร์ ในโอกาสครบรอบ
              </span>
            </p>
          </div>
          <div className="relative">
            <p className="absolute text-white font-bold text-md">
              ห้องพักและอาหารเช้า
            </p>
            <Image
              src="/assets/imgpromotions/promotions3.jpg"
              alt="400x200"
              width={400}
              height={200}
            />
            <p className="absolute bottom-1 text-white font-bold">
              SINGLA
              <p></p>
              <span>ช่วงเวลาดีดีแห่งความสุขตรงนี้ของคุณ</span>
            </p>
          </div>
          <div className="relative">
            <p className="absolute text-white font-bold text-md">แพ็กเกจ</p>
            <Image
              src="/assets/imgpromotions/promotions4.jpg"
              alt="400x200"
              width={400}
              height={200}
            />
            <p className="absolute text-white font-bold bottom-1">
              ยิ่งพักนาน ยิ่งคุ้ม
              <p></p>
              <span>พลาดไม่ได้กับข้อเสนอยิ่งพักนาน ยิ่งคุ้ม</span>
            </p>
          </div>
          <div className="relative">
            <p className="absolute text-white font-bold text-md">
              ข้อเสนอห้องพัก
            </p>
            <Image
              src="/assets/imgpromotions/promotions5.jpg"
              alt="400x200"
              width={400}
              height={200}
            />
            <p className="absolute text-white font-bold bottom-1">
              พักก่อน จ่ายทีหลัง
              <p></p>
              <span>
                ผ่อนชำระแบบไม่มีดอกเบี้ย สำหรับผู้ถือบัตรที่ร่วมรายการ
              </span>
            </p>
          </div>
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default PromotionsPage;
