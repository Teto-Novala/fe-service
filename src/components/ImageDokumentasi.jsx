import Image from "next/image";
import React from "react";

export default function ImageDokumentasi({ ...props }) {
  return (
    <div className="relative w-full  h-56  rounded-lg overflow-hidden">
      <Image {...props} alt="img-1" fill objectFit="cover" />
    </div>
  );
}
