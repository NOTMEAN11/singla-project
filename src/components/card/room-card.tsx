import React from "react";
import Image from "next/image";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { room } from "@/configs/constant";
import { cn } from "@/lib/utils";

type Props = {
  price: number;
  name: string;
  image: string;
  slug: string;
  className?: string;
};

function RoomCard({ price, name, image, slug, className }: Props) {
  return (
    <div className={cn("p-4 border w-80", className)}>
      <Image
        src={image}
        alt="room1"
        width={1024}
        height={683}
        className="object-cover w-full h-72"
      />
      <div className="space-y-1 my-2">
        <h2 className="text-3xl font-bold uppercase">{name}</h2>
        <p className="text-gray-400 text-sm">ราคา {price} บาท/คืน</p>
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
