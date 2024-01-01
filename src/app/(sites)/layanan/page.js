"use client";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useState } from "react";

import img2 from "../../../../public/service2.jpg";
import img3 from "../../../../public/service3.jpg";
import Card from "@/components/Card";

export default function Layanan() {
  const [ac, setAc] = useState(true);
  const [kulkas, setKulkas] = useState(false);

  function acHandler() {
    setAc(true);
    setKulkas(false);
  }
  function kulkasHandler() {
    setKulkas(true);
    setAc(false);
  }

  return (
    <section className="mt-28 px-2 lg:px-5 font-bold">
      <h1 className="text-xl text-center mb-4">
        Kami menangani berbagai kerusakan AC dan Kulkas kesayangan Anda
      </h1>
      <div className="w-full flex justify-center items-center gap-x-3 mb-8">
        <Button
          onClick={acHandler}
          className={`bg-dark hover:bg-dark/60 transition hover:text-light ${
            ac && "bg-darker"
          }`}
        >
          AC
        </Button>
        <Button
          onClick={kulkasHandler}
          className={`bg-dark hover:bg-dark/60 transition hover:text-light ${
            kulkas && "bg-darker"
          }`}
        >
          CCTV
        </Button>
      </div>
      <div>
        {ac && (
          <>
            <h2 className="text-center mb-6">
              Kami melayani servis AC segala merek meliputi kerusakan AC sebagai
              berikut:
            </h2>
            <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-9">
              <Card src={img2} />
              <Card src={img2} />
              <Card src={img2} />
              <Card src={img2} />
              <Card src={img2} />
              <Card src={img2} />
            </div>
          </>
        )}
        {kulkas && (
          <>
            <h2 className="text-center mb-6">
              Kami melayani servis CCTV segala merek meliputi kerusakan kulkas
              sebagai berikut:
            </h2>
            <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-9">
              <Card src={img3} />
              <Card src={img3} />
              <Card src={img3} />
              <Card src={img3} />
              <Card src={img3} />
              <Card src={img3} />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
