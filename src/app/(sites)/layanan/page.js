"use client";
import Button from "@/components/Button";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import img2 from "../../../../public/service2.jpg";
import img3 from "../../../../public/service3.jpg";
import Card from "@/components/Card";
import { apiInstance } from "@/axios/instance";

export default function Layanan() {
  const [ac, setAc] = useState(true);
  const [cctv, setCCTV] = useState(false);
  const [dataAC, setDataAC] = useState(null);
  const [loadingAC, setLoadingAC] = useState(true);
  const [dataCCTV, setDataCCTV] = useState(null);
  const [loadingCCTV, setLoadingCCTV] = useState(true);

  useEffect(() => {
    apiInstance
      .get("/service")
      .then((res) => {
        setDataAC(
          res.data.data.filter((data) => {
            return data.typeservice === "AC";
          })
        );
        setLoadingAC(false);

        setDataCCTV(
          res.data.data.filter((data) => {
            return data.typeservice === "CCTV";
          })
        );
        setLoadingCCTV(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  function acHandler() {
    setAc(true);
    setCCTV(false);
  }
  function cctvHandler() {
    setCCTV(true);
    setAc(false);
  }

  return (
    <section className="pt-28 px-2 lg:px-5 font-bold">
      <h1 className="text-xl text-center mb-4">
        Kami menangani berbagai kerusakan AC dan CCTV kesayangan Anda
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
          onClick={cctvHandler}
          className={`bg-dark hover:bg-dark/60 transition hover:text-light ${
            cctv && "bg-darker"
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
              {loadingAC && <div className="min-h-screen">Loading...</div>}
              {loadingAC === false &&
                dataAC.map((data, index) => {
                  return <Card key={index} data={data} />;
                })}
            </div>
          </>
        )}
        {cctv && (
          <>
            <h2 className="text-center mb-6">
              Kami melayani servis CCTV segala merek meliputi kerusakan CCTV
              sebagai berikut:
            </h2>
            <div className="flex flex-col gap-y-4 md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-9">
              {loadingCCTV && <div className="min-h-screen">Loading...</div>}
              {loadingCCTV === false &&
                dataCCTV.map((data, index) => {
                  return <Card key={index} data={data} />;
                })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
