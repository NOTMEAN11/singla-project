import PageHeader from "@/components/pageheader/pageheader";
import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";

import db from "@/configs/db";
import Image from "next/image";
import Link from "next/link";

const imgs = [
  {
    src: "/assets/imgpromotions/promotions5.jpg",
    alt: "ค้นหาหมายเลขที่จอง",
    link: "/payment/search-booking",
    width: 750,
    height: 750,
  },
  {
    src: "/assets/imgpromotions/promotions6.jpg",
    alt: "แจ้งชำระเงิน",
    link: "/payment/inform-payment",
    width: 750,
    height: 750,
  },
];

function PaymentPage() {
  return (
    <PageWrapper className="mt-20">
      <ContainerWrapper>
        <PageHeader
          title="ชำระเงิน"
          breadcrumb={[{ title: "ชำระเงิน", path: "/payment" }]}
          //   disableTitle
        />
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 justify-items-center">
          {imgs.map((img, index) => (
            <Link href={img.link} key={index} className="relative ">
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                {...img}
                className="transition-all brightness-50 hover:brightness-100"
              />
              <div className="absolute w-full text-2xl font-bold text-center text-white top-1/2">
                {img.alt}
              </div>
            </Link>
          ))}
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default PaymentPage;
