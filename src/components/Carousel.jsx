"use client";
import React from "react";
import img1 from "../../public/service.jpg";
import img2 from "../../public/service2.jpg";
import img3 from "../../public/service3.jpg";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function Carousel({ token }) {
  const router = useRouter();

  function bookingHandler() {
    router.push("/booking");
  }

  return (
    <div className="carousel w-full h-80 md:h-96 xl:h-[35rem]">
      <div id="slide1" className="carousel-item relative bg-black/50 w-full">
        <div className="w-full relative mix-blend-multiply">
          <Image alt="img-1" src={img1} fill objectFit="cover" />
        </div>
        <div className="absolute flex justify-center gap-x-5 items-center transform -translate-y-1/2 left-1 right-1 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <div className="w-full">
            <div className="text-center flex flex-col justify-between gap-y-9 items-center">
              <h1 className="text-2xl xl:text-5xl font-bold text-light">
                Mau service tanpa perlu repot bawa AC dan CCTV, cukup di rumah
                saja?
              </h1>
              <Button
                onClick={bookingHandler}
                className="px-2 py-1 w-fit xl:w-[20%] rounded-md font-semibold text-xl bg-dark hover:bg-darker transition hover:text-light"
              >
                Booking
              </Button>
            </div>
          </div>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full bg-black/50">
        <div className="w-full relative  mix-blend-multiply">
          <Image alt="img-1" src={img2} fill objectFit="cover" />
        </div>
        <div className="absolute flex justify-center gap-x-5 items-center transform -translate-y-1/2 left-1 right-1 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <div className="w-full">
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl  font-bold text-light mb-5">
                Garansi Kerusakan
              </h1>
              <p className="text-white ">
                Untuk menjawab kekhawatiran masyarakat jika AC ataupun CCTV yang
                telah diperbaiki rusak kembali, {"Brand"} memberikan Garansi ?
                tahun untuk jasa.
              </p>
            </div>
          </div>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full bg-black/50">
        <div className="w-full relative mix-blend-multiply">
          <Image alt="img-1" src={img3} fill objectFit="cover" />
        </div>
        <div className="absolute flex justify-center gap-x-5 items-center transform -translate-y-1/2 left-1 right-1 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <div className="w-full">
            <div className="">
              <h1 className="text-2xl md:text-4xl font-bold text-light mb-2">
                Perlu Service
              </h1>
              <p className="text-white text-2xl mb-2">AC atau CCTV ?</p>
              <p className="text-white text-xl ">
                Kami MFlash berkomitmen untuk selalu memberikan Pelayanan
                Service yang berkualitas, pengerjaan langsung di depan Customer
              </p>
            </div>
          </div>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}
