import React from "react";
import { FaLine } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { IoCall } from "react-icons/io5";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/container-wrapper";

function Footer() {
  return (
    <div className="bg-gray-300 w-full h-72 ">
      <ContainerWrapper>
        <div className="grid grid-cols-3">
          <div className="my-16 ml-8 font-bold ">
            <p>ห้องพัก</p>
            <p>โปรโมชั่น</p>
            <p>ติดต่อเรา</p>
          </div>
          <div className="my-16">
            <h3 className="uppercase mb-4">About</h3>
            <div className="flex space-x-3">
              <FaLine />
              <SiInstagram />
              <IoCall />
            </div>
          </div>
          <div className="mt-16">
            <h3 className="uppercase mb-4">Resort location</h3>
            <Image
              src="/assets/placeholders/300x200.svg"
              alt="400"
              width={200}
              height={200}
            />
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default Footer;
