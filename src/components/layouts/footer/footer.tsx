import React from "react";
import { FaLine } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { IoCall } from "react-icons/io5";
import Image from "next/image";
import ContainerWrapper from "@/components/wrapper/container-wrapper";

function Footer() {
  return (
    <div className="w-full h-full mt-8 bg-gray-100">
      <ContainerWrapper>
        <div className="grid grid-cols-1 py-8 space-y-8 text-sm md:grid-cols-2 lg:grid-cols-3 md:space-y-0">
          <div className="font-normal ">
            <h1 className="text-2xl font-black">SINGLA</h1>
            <p>ห้องพัก</p>
            <p>โปรโมชั่น</p>
            <p>ติดต่อเรา</p>
            <div className="mt-2 font-bold">
              <p className="text-lg">ที่อยู่</p>
              <p className="font-normal">
                Phawong, Mueang Songkhla District, Songkhla 90000
              </p>
            </div>
          </div>
          <div className="font-bold">
            <h3 className="uppercase">เกี่ยวกับ</h3>
            <div className="text-sm">
              <ul className="font-normal">
                <li className="flex space-x-2 item-center">
                  <FaLine /> <span>@singla2432</span>
                </li>
                <li className="flex space-x-2 item-cente">
                  <SiInstagram className="" /> <span>@singla2432</span>
                </li>
                <li className="flex space-x-2 item-cente">
                  <IoCall /> <span>088-888-8888</span>
                </li>
              </ul>
            </div>
          </div>
          {/* <div className="mt-16">
            <h3 className="mb-4 font-bold uppercase">ที่ตั้ง</h3>
            <Image
              src="/assets/placeholders/300x200.svg"
              alt="400"
              width={300}
              height={300}
            />
          </div> */}
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default Footer;
