"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  images: string[];
};

function ImageSlider({ images }: Props) {
  return (
    <Carousel
      opts={{ loop: true }}
      className="w-full h-full max-w-4xl"
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="flex items-center justify-center"
          >
            <Image
              src={image}
              alt={"รูปที่ " + index}
              width={1024}
              height={480}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

export default ImageSlider;
