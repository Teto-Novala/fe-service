import Image from "next/image";
import React from "react";

export default function CardPromo({ src }) {
  return (
    <div className="card bg-base-100 shadow-xl md:w-[40%] xl:w-1/4 hover:scale-90 transition hover:shadow-sm">
      <div className="relative w-full h-52">
        <Image src={src} alt="test" fill objectFit="cover" />
      </div>
      <div className="card-body">
        <h2 className="card-title">Title</h2>
        <p className="truncate mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nulla
          repellendus accusamus, nisi eligendi aspernatur unde nemo voluptatibus
          laborum enim placeat non assumenda mollitia cumque illum quod aliquam
          asperiores debitis?
        </p>
        <div className="card-actions justify-start">
          <button className="btn btn-primary bg-dark hover:bg-darker transition border-none">
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}
