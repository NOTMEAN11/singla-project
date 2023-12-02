import React from "react";
import { FaLine } from "react-icons/fa6";
import { SiInstagram } from "react-icons/si";
import { IoCall } from "react-icons/io5";
import Image from "next/image";

function Footer() {
  return (
    <div className="bg-gray-300 w-full h-72 ">
      <div className="grid grid-cols-3">
        <div className="my-16 ml-8">
          <h3 className="uppercase mb-4">Facilties</h3>
          <p>Rooms</p>
          <p>Promotion</p>
          <p>Gallery</p>
        </div>
        <div className="my-16">
          <h3 className="uppercase mb-4">About</h3>
          <div className="flex space-x-3">
            <FaLine />
            <SiInstagram />
            <IoCall />
          </div>
        </div>
        <div className="my-16">
          <h3 className="uppercase mb-4">Resort location</h3>
          <Image
            src="/assets/placeholders/300x200.svg"
            alt="400"
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
