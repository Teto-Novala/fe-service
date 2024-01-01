import Image from "next/image";
import React from "react";

export default function Card({ src }) {
  return (
    <div className="group card w-full md:w-[40%] bg-base-100 shadow-xl hover:shadow-none transition hover:bg-light">
      <div className="relative w-full h-56 xl:h-72 rounded-t-xl group-hover:opacity-90 transition overflow-hidden">
        <Image src={src} alt="img" fill objectFit="cover" />
      </div>
      <div className="card-body items-center text-center">
        <p>(Jenis Kerusakan)</p>
      </div>
    </div>
  );
}
