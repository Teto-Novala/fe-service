"use client";
import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";
import TextArea from "@/components/TextArea";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Booking() {
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      // alert("anda belum login");
      toast.error("Anda Belum Login");
      redirect("/login");
    },
  });
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
    if (
      dataForm.address === "" ||
      dataForm.date === "" ||
      dataForm.name === "" ||
      dataForm.note === "" ||
      dataForm.phone === "" ||
      dataForm.service === "Pilih" ||
      dataForm.type_service === "Pilih"
    ) {
      toast.error("Mohon Diisi");
      return;
    }
    try {
      const res = await apiInstance.post("/booking", dataForm, {
        headers: {
          Authorization: `Bearer ${session.user?.token}`,
        },
      });
      // alert("data berhasil dikirim");
      toast.success("Berhasil Booking");
      router.push("/transaksi");
    } catch (error) {
      toast.error("Gagal Booking");
      // console.log(error);
    }
  }

  return (
    <section className="pt-28 min-h-screen">
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
              type="submit"
              className={
                "w-full bg-dark hover:bg-darker transition hover:text-light border-none"
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
