import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import Image from "next/image";
import PromotionsCard from "@/components/card/promotions-card";
import PageHeader from "@/components/pageheader/pageheader";
import db from "@/configs/db";

async function getData() {
  const promotions = await db.promotion.findMany();
  return { promotions };
}

async function PromotionsPage() {
  const { promotions } = await getData();
  return (
    <PageWrapper className="mt-20 ">
      <PageHeader
        title="โปรโมชั่นทั้งหมด"
        className="container"
        breadcrumb={[{ title: "โปรโมชั่น", path: "/promotions" }]}
      />
      <ContainerWrapper className="grid items-center justify-center">
        <div className="grid grid-cols-1 gap-2 mb-4 md:grid-cols-2 lg:grid-cols-3">
          {promotions.slice(0, 6).map((promotion) => (
            <PromotionsCard {...promotion} key={promotion.slug} />
          ))}
        </div>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default PromotionsPage;
