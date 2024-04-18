import ContainerWrapper from "@/components/wrapper/container-wrapper";
import PageWrapper from "@/components/wrapper/page-wrapper";
import React from "react";
import Image from "next/image";
import PromotionsCard from "@/components/card/promotions-card";
import PageHeader from "@/components/pageheader/pageheader";
import { notFound } from "next/navigation";
import db from "@/configs/db";
import Markdown from "react-markdown";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

async function getData(slug: string) {
  const promotion = await db.promotion.findFirst({
    where: {
      slug: slug,
    },
  });
  return { promotion };
}

async function PromotionPage({ params }: { params: { slug: string } }) {
  const { promotion } = await getData(params.slug);
  if (!promotion) {
    return notFound();
  }
  return (
    <PageWrapper className="mt-20">
      <PageHeader
        title={promotion.name}
        disableTitle
        className="container"
        breadcrumb={[
          { title: "โปรโมชั่น", path: "/promotions" },
          { title: promotion.name, path: `/promotions/${promotion.slug}` },
        ]}
      />
      <ContainerWrapper>
        <Markdown className="prose dark:prose-invert">
          {promotion.content}
        </Markdown>
        <Link
          href="/booking"
          className={buttonVariants({
            className: "mt-4 w-1/2",
          })}
        >
          จองเลย
        </Link>
      </ContainerWrapper>
    </PageWrapper>
  );
}

export default PromotionPage;
