import Image from "next/image";
import React from "react";

export default function CardInfo({ data }) {
  return (
    <div className="card shadow-xl md:w-[40%] xl:w-1/4 hover:scale-90 transition hover:shadow-sm bg-dark">
      <div className="relative w-full h-52">
        <Image src={data.image} alt="test" fill objectFit="cover" />
      </div>
      <div className="card-body text-black">
        <h2 className="card-title">{data.title}</h2>
        <p className="truncate mb-4">{data.description}</p>
        <p className="truncate mb-4">{data.date}</p>
      </div>
    </div>
  );
}
