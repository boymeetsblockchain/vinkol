"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";

const images = [
  "/slide1.jpeg",
  "/slide2.jpeg",
  "/slide3.jpeg",
  "/slide4.jpeg",
  "/slide5.png",
];

const ImagesSlider = () => {
  const settings = {
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    fade: true,
    // speed: 5000,
    autoplaySpeed: 4000,
    cssEase: "linear",
    infinite: true,
  };
  return (
    <div className="overflow-hidden max-w-[320px]">
      <Slider {...settings}>
        {images.map((img) => (
          <Image
            src={`/assets${img}`}
            width={300}
            height={300}
            className="rounded-2xl object-cover min-h-[300px] w-full"
            alt="Vinkol Logistics"
          />
        ))}
      </Slider>
    </div>
  );
};

export default ImagesSlider;
