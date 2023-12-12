import React from "react";
import Image from "next/image";
import Link from "next/link";
type Prop = {
  title: string;
  content: string;
  image: string;
  slug: string;
};

function PromotionsCard({ content, slug, title, image }: Prop) {
  return (
    <Link href={"/promotions/" + slug} className="relative">
      <p className="absolute text-white font-bold text-md p-2 z-50 ">{title}</p>
      <Image
        className="brightness-50 hover:"
        src={image}
        alt="400x200"
        width={400}
        height={200}
      />
      <p className="absolute bottom-1 text-white font-bold text-sm p-2">
        {content}
      </p>
    </Link>
  );
}

export default PromotionsCard;
