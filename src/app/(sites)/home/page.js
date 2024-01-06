"use client";

import Carousel from "@/components/Carousel";
import { useSession } from "next-auth/react";
import Image from "next/image";

import img1 from "../../../../public/service.jpg";
import img2 from "../../../../public/service2.jpg";
import img3 from "../../../../public/service3.jpg";
import FormKontak from "@/components/FormKontak";
import { useEffect, useState } from "react";
import { apiInstance } from "@/axios/instance";
import { useRouter } from "next/navigation";
import CardInfo from "@/components/CardInfo";

export default function Home() {
  const session = useSession();
  const token = session?.data?.user?.token;
  const [dataInfo, setDataInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    apiInstance
      .get("/information")
      .then((res) => {
        setDataInfo(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="pt-16">
      <Carousel token={token} />
      <section className="mt-16 xl:mt-36 px-2 lg:px-5">
        <div className="flex flex-col gap-y-5">
          <div className="text-lg md:text-xl md:text-center">
            <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">
              Tentang Kami {"Brand"}
            </h1>
            <p className="mb-2">
              Kami memberikan pelayanan yang terpercaya, ramah dan profesional.
            </p>
            <p className="mb-2">
              Dengan alat - alat yang lengkap, kami dapat mengatasi kasus yang
              yang tidak tertangani atau tidak terselesaikan oleh penyedia jasa
              servis AC dan CCTV.
            </p>
          </div>
          <div className="flex flex-col gap-y-4 items-center md:gap-y-0 md:flex-row md:gap-x-5">
            <div className="relative w-full h-52 xl:h-72 md:rounded-lg md:overflow-hidden">
              <Image src={img1} alt="img-1" fill objectFit="cover" />
            </div>
            <div className="relative w-full h-52 xl:h-72 md:rounded-lg md:overflow-hidden">
              <Image src={img2} alt="img-1" fill objectFit="cover" />
            </div>
            <div className="relative w-full h-52 xl:h-72 md:rounded-lg md:overflow-hidden">
              <Image src={img3} alt="img-1" fill objectFit="cover" />
            </div>
          </div>
        </div>
      </section>
      <section className="mt-16 xl:mt-36 px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">
          Informasi
        </h1>
        <div className="flex flex-col gap-y-8 md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-8 w-full">
          {loading && <div>Loading....</div>}
          {loading === false &&
            dataInfo.map((data, index) => {
              return <CardInfo key={index} data={data} />;
            })}
        </div>
      </section>
      <section className="mt-16 xl:mt-36 px-2 py-16 lg:px-5 bg-main">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-4 xl:mb-8">
          Kontak Kami
        </h1>
        <div className="xl:flex xl:items-center xl:justify-around">
          <FormKontak token={token} />
          <div>
            <div className="hidden xl:block relative w-[35rem] h-[39rem] rounded-md overflow-hidden">
              <Image src={img1} alt="img-1" fill objectFit="cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
