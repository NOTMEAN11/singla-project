import React from "react";
import Image from "next/image";
function HeroSection() {
  return (
    <React.Fragment>
      <div className="mt-40 mb-4 ">
        <h1 className="sm:text-8xl  font-medium text-4xl uppercase max-w-6xl text-gray-600 mb-8">
          พบประสบการณ์ที่ไม่เหมือนใครที่{" "}
          <span className="underline underline-offset-4 text-gray-800 font-bold">
            SINGLA
          </span>{" "}
          ครบทุกความต้องการของคุณ
        </h1>
        <Image
          src={"/assets/bg.jpg"}
          alt="404"
          width={1400}
          height={500}
          className="object-cover w-full h-[600px]"
        />
      </div>
    </React.Fragment>
  );
}
export default HeroSection;
