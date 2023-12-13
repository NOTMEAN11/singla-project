"use client";

import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import Image from "next/image";

type Props = {
  images: string[];
};

function ImageSlider({ images }: Props) {
  const swiper = useSwiper();
  return (
    <Swiper
      className="w-full h-full"
      navigation={true}
      modules={[Navigation]}
      loop={true}
    >
      {images.map((images, index) => (
        <SwiperSlide key={index}>
          <Image src={images} alt={`รูปที่{index}`} height={480} width={1400} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSlider;
