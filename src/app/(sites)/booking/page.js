"use client";
import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";
import TextArea from "@/components/TextArea";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Booking() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      alert("anda belum login");
      redirect("/login");
    },
  });
  console.log("Booking : ", session);
  const [dataForm, setDataForm] = useState({
    name: "",
    phone: "",
    date: "",
    service: "",
    address: "",
    type_service: "",
    note: "",
  });

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     alert("Silahkan Login Terlebih dahulu");
  //     redirect("/login");
  //   }
  // }, [status]);

  async function formHandler(e) {
    e.preventDefault();
    try {
      const res = await apiInstance.post("/booking", dataForm, {
        headers: {
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      alert("data berhasil dikirim");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="mt-28">
      <h1 className="text-center text-2xl md:text-3xl font-bold mb-4">
        Booking
      </h1>
      <div className="flex justify-center w-full">
        <form
          onSubmit={formHandler}
          className="w-full flex flex-col justify-center items-center gap-y-2"
        >
          <InputForm
            label={"Nama"}
            type={"text"}
            placeholder={"Nama Anda"}
            value={dataForm.name}
            onChange={(e) => setDataForm({ ...dataForm, name: e.target.value })}
          />
          <InputForm
            label={"No. HP"}
            type={"text"}
            placeholder={"Nomor Anda"}
            value={dataForm.phone}
            onChange={(e) =>
              setDataForm({ ...dataForm, phone: e.target.value })
            }
          />
          <InputForm
            label={"Tanggal"}
            type={"date"}
            onChange={(e) => setDataForm({ ...dataForm, date: e.target.value })}
          />
          <SelectForm
            label={"Service"}
            onChange={(e) =>
              setDataForm({ ...dataForm, service: e.target.value })
            }
          />
          <InputForm
            label={"Alamat"}
            type={"text"}
            placeholder={"Alamat Anda"}
            value={dataForm.address}
            onChange={(e) =>
              setDataForm({ ...dataForm, address: e.target.value })
            }
          />
          <SelectForm
            label={"Tipe Service"}
            option1="perbaikan"
            option2="pemasangan"
            onChange={(e) =>
              setDataForm({ ...dataForm, type_service: e.target.value })
            }
          />
          <TextArea
            label={"Note"}
            onChange={(e) => setDataForm({ ...dataForm, note: e.target.value })}
          />
          <div className="flex justify-around items-center w-full max-w-xs md:max-w-md ">
            <Button
              className={
                "w-[40%] bg-dark hover:bg-darker transition hover:text-light border-none"
              }
            >
              Reset
            </Button>
            <Button
              type="submit"
              className={
                "w-[40%] bg-dark hover:bg-darker transition hover:text-light border-none"
              }
            >
              Kirim
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
