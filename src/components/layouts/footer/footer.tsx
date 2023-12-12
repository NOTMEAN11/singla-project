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
          <div className="my-16 font-bold">
            <h3 className="uppercase">About</h3>
            <div className="text-sm">
              <ul>
                <li className="flex space-x-2">
                  <FaLine /> <span>@singla2432</span>
                </li>
                <li className="flex space-x-2">
                  <SiInstagram className="" /> <span>@singla2432</span>
                </li>
                <li className="flex space-x-2">
                  <IoCall /> <span>088-888-8888</span>
                </li>
              </ul>
              <div>
                <p className="text-lg">ที่อยู่</p>
                <p>Phawong, Mueang Songkhla District, Songkhla 90000</p>
              </div>
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
