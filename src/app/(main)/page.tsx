import HeroSection from "@/components/section/herosection";
import db from "@/configs/db";
import PageWrapper from "@/components/wrapper/page-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import RoomCard from "@/components/card/room-card";

import ContainerWrapper from "@/components/wrapper/container-wrapper";
import Accordions from "@/components/accordions";
import HomeSection from "@/components/section/homepage/homepage";

async function GetData() {
  const faqs = await db.faq.findMany();
  const roomType = await db.roomType.findMany();

  return {
    faqs,
    roomType,
  };
}

export default async function Home() {
  const { faqs, roomType } = await GetData();
  return (
    <PageWrapper>
      <ContainerWrapper>
        <HeroSection />
        <HomeSection faqs={faqs} roomType={roomType} />
      </ContainerWrapper>
    </PageWrapper>
  );
}
