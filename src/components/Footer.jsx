import { IconBrandInstagram, IconBrandTiktok } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <section className="bg-dark w-full xl:mt-36 mt-16 px-2 py-3">
      <div className="flex justify-center items-center gap-x-2 mb-2">
        <Link href={"/home"}>
          <IconBrandInstagram className="w-8 h-8 hover:text-white transition" />
        </Link>
        <Link href={"/home"}>
          <IconBrandTiktok className="w-8 h-8 hover:text-white transition " />
        </Link>
      </div>
      <p className="text-xs text-center">
        2023 - Copyright, All Rights Reserved, Developed by Brand
      </p>
    </section>
  );
}
