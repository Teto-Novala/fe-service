import Image from "next/image";
import React from "react";

export default function ImageDokumentasi({ ...props }) {
  return (
    <div className="relative w-full md:w-[40%] xl:w-[30%] h-56 md:h-64 xl:h-72 hover:scale-105 hover:shadow-xl transition rounded-lg overflow-hidden">
      <Image {...props} alt="img-1" fill objectFit="cover" />
    </div>
  );
}
