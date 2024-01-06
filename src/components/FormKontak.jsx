import React, { useState } from "react";
import InputForm from "./InputForm";
import SelectForm from "./SelectForm";
import TextArea from "./TextArea";
import Button from "./Button";
import { apiInstance } from "@/axios/instance";
import toast from "react-hot-toast";

export default function FormKontak({ token }) {
  const [data, setData] = useState({
    name: "",
    email: "",
    typeservice: "Pilih",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleReset = () => {
    setData({
      name: "",
      email: "",
      typeservice: "Pilih",
      message: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token === undefined) {
      // alert("Login Terlebih Dahulu");
      toast.error("Login Terlebih Dahulu");
      return;
    }
    setLoading(true);
    if (
      data.name === "" ||
      data.email === "" ||
      data.typeservice === "Pilih" ||
      data.message === ""
    ) {
      // alert("Mohon Diisi");
      toast.error("Mohon Diisi");
      setLoading(false);
      return;
    }
    try {
      const res = await apiInstance.post("/contact", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      // alert("Berhasil Dikirim");
      toast.success("Berhasil Dikirim");
    } catch (error) {
      setLoading(false);
      toast.error("Gagal Mengirim");
      // console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col justify-center items-center gap-y-2 xl:w-1/2 xl:border bg-light xl:border-slate-100 xl:rounded xl:p-3"
    >
      <InputForm
        label={"Nama"}
        type={"text"}
        placeholder={"Nama Anda"}
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
      />
      <InputForm
        label={"Email"}
        type={"email"}
        placeholder={"Email Anda"}
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <SelectForm
        label={"Pilih Layanan"}
        value={data.typeservice}
        onChange={(e) => setData({ ...data, typeservice: e.target.value })}
      />
      <TextArea
        label={"Pesan"}
        value={data.message}
        onChange={(e) => setData({ ...data, message: e.target.value })}
      />
      <div className="flex justify-around items-center w-full max-w-xs md:max-w-md ">
        <Button
          type="button"
          onClick={handleReset}
          className={
            "w-[40%] bg-dark hover:bg-darker transition hover:text-light border-none"
          }
        >
          {loading ? "Loading" : "Reset"}
        </Button>
        <Button
          type="submit"
          className={
            "w-[40%] bg-dark hover:bg-darker transition hover:text-light border-none"
          }
        >
          {loading ? "Loading" : "Kirim"}
        </Button>
      </div>
    </form>
  );
}
