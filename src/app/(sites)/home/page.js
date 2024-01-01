"use client";

import Carousel from "@/components/Carousel";
import { useSession } from "next-auth/react";
import Image from "next/image";

import img1 from "../../../../public/service.jpg";
import img2 from "../../../../public/service2.jpg";
import img3 from "../../../../public/service3.jpg";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import CardPromo from "@/components/CardPromo";

export default function Home() {
  const session = useSession();

  const token = session?.data?.user?.token;
  console.log(token);
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
          Promo
        </h1>
        <div className="flex flex-col gap-y-8 md:flex-row md:flex-wrap md:justify-center md:items-center md:gap-8 w-full">
          <CardPromo src={img1} />
          <CardPromo src={img1} />
          <CardPromo src={img1} />
          <CardPromo src={img1} />
          <CardPromo src={img1} />
          <CardPromo src={img1} />
        </div>
      </section>
      <section className="mt-16 xl:mt-36 px-2 py-16 lg:px-5 bg-main">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-4 xl:mb-8">
          Kontak Kami
        </h1>
        <div className="xl:flex xl:items-center xl:justify-around">
          <form className="w-full flex flex-col justify-center items-center gap-y-2 xl:w-1/2 xl:border bg-light xl:border-slate-100 xl:rounded xl:p-3">
            <InputForm label={"Nama"} type={"text"} placeholder={"Nama Anda"} />
            <InputForm
              label={"Email"}
              type={"email"}
              placeholder={"Email Anda"}
            />
            <InputForm
              label={"No. HP"}
              type={"text"}
              placeholder={"Nomor Anda"}
            />
            <SelectForm label={"Pilih Layanan"} />
            <TextArea label={"Pesan"} />
            <div className="flex justify-around items-center w-full max-w-xs md:max-w-md ">
              <Button
                className={
                  "w-[40%] bg-dark hover:bg-darker transition hover:text-light border-none"
                }
              >
                Reset
              </Button>
              <Button
                className={
                  "w-[40%] bg-dark hover:bg-darker transition hover:text-light border-none"
                }
              >
                Kirim
              </Button>
            </div>
          </form>
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
