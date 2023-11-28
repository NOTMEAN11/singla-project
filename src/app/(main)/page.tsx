import PageWrapper from "@/components/wrapper/page-wrapper";
import Image from "next/image";

export default function Home() {
  return (
    <PageWrapper>
      <div className="mt-24 mb-24">
        <h1 className="text-6xl text-black">Singla</h1>
        <p className="flex justify-end text-1xl">TODO:ข้อมูลโรงแรม</p>
        <Image
          src={"/assets/bg.jpg"}
          alt="404"
          width={1400}
          height={500}
          className="object-cover w-full h-96"
        />
      </div>
    </PageWrapper>
  );
}
