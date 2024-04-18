import React from "react";
import Image from "next/image";
import Link from "next/link";
type Prop = {
  name: string;
  description: string;
  image: string;
  slug: string;
  content: string;
};

function PromotionsCard({ description, slug, name, image }: Prop) {
  return (
    <Link href={"/promotions/" + slug} className="relative">
      <p className="absolute z-50 p-2 font-bold text-white text-md ">{name}</p>
      <Image
        className="brightness-50 hover:"
        src={image}
        alt="400x200"
        width={400}
        height={200}
      />
      <p className="absolute p-2 text-sm font-bold text-white bottom-1">
        {description}
      </p>
    </Link>
  );
}

export default PromotionsCard;
