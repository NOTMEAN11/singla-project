import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { room } from "@/configs/constant";

type Props = {
  price: number;
  name: string;
  image: string;
  slug: string;
};

function RoomCard({ price, name, image, slug }: Props) {
  return (
    <div className="p-4 border w-80">
      <Image
        src={image}
        alt="room1"
        width={1024}
        height={683}
        className="object-cover w-full h-72"
      />
      <div className="space-y-1 my-2">
        <p className="text-gray-400 text-sm">{price}</p>
        <h2 className="text-5xl font-bold uppercase">{name}</h2>
      </div>
      <Link
        href={"/rooms/" + slug}
        className={buttonVariants({ variant: "outline" })}
      >
        รายละเอียด
      </Link>
    </div>
  );
}

export default RoomCard;
