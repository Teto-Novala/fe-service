import Image from "next/image";
import React from "react";
import img3 from "../../../../public/service3.jpg";
import ImageDokumentasi from "@/components/ImageDokumentasi";

export default function page() {
  return (
    <section className="mt-20 md:mt-24 px-2 lg:px-5">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-12">
        Daerah yang pernah kami kunjungi
      </h1>
      <div>
        <div className="border border-slate-800 rounded-lg p-4 relative mb-24">
          <h2 className="text-xl md:text-2xl font-semibold absolute -top-6 p-2 xl:right-1/2 xl:transform xl:translate-x-1/2 bg-white">
            Lakbok
          </h2>
          <div className="flex w-full flex-col md:flex-row md:flex-wrap items-center justify-center gap-8 md:gap-10 pt-3 md:py-6">
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
          </div>
        </div>
        <div className="border border-slate-800 rounded-lg p-4 relative">
          <h2 className="text-xl md:text-2xl font-semibold absolute -top-6 p-2 xl:right-1/2 xl:transform xl:translate-x-1/2 bg-white">
            Depok
          </h2>
          <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-8 md:gap-10 pt-3 md:py-6">
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
            <ImageDokumentasi src={img3} />
          </div>
        </div>
      </div>
    </section>
  );
}
