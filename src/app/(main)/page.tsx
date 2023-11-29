import AboutSection from "@/components/section/aboutsection";
import HeroSection from "@/components/section/herosection";
import { Button } from "@/components/ui/button";
import PageWrapper from "@/components/wrapper/page-wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <PageWrapper>
      <HeroSection />
      <AboutSection />
    </PageWrapper>
  );
}
