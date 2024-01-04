"use client";
import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      alert("Anda belum login");
      redirect("/login");
    },
  });
  const router = useRouter();
  if (session?.user?.role === "user") {
    alert("Hanya untuk Admin");
    router.back();
  }
  const token = session?.user?.token;
  const [selectedFile, setSelectedFile] = useState();
  const [dataForm, setDataForm] = useState({
    name: "",
    detailService: "",
    typeservice: "",
    image: "",
  });
  const [preview, setPreview] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setDataForm({ ...dataForm, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiInstance.post("/service", dataForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Berhasil Membuat Layanan");
      setLoading(false);
      router.push("/admin/layanan");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const resetHandler = () => {
    setDataForm({
      ...dataForm,
      name: "",
      detailService: "",
    });
  };

  return (
    <div className="pt-20 xl:pt-24 min-h-screen">
      <section className="px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-7">
          Add Layanan
        </h1>
        <div>
          <form
            onSubmit={submitHandler}
            className="w-full xl:w-1/2 xl:mx-auto bg-light flex flex-col justify-center items-center gap-y-2"
          >
            <InputForm
              label={"Nama"}
              placeholder={"Nama"}
              value={dataForm.name}
              onChange={(e) =>
                setDataForm({ ...dataForm, name: e.target.value })
              }
            />
            <SelectForm
              label={"Tipe Service"}
              onChange={(e) =>
                setDataForm({ ...dataForm, typeservice: e.target.value })
              }
            />
            <InputForm
              label={"Detail Service"}
              placeholder={"Detail Service"}
              value={dataForm.detailService}
              onChange={(e) =>
                setDataForm({ ...dataForm, detailService: e.target.value })
              }
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs"
              onChange={onSelectFile}
            />
            {selectedFile && (
              <div className="bg-darker/75 py-3 xl:w-2/3 xl:mx-auto">
                <img
                  src={preview}
                  alt="gambar info"
                  className="w-full h-56 object-contain md:h-64 xl:h-80 "
                />
              </div>
            )}
            <div className="w-full flex items-center justify-center gap-x-4">
              <Button
                type="button"
                onClick={resetHandler}
                className={"bg-dark hover:bg-darker transition w-[40%]"}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className={"bg-dark hover:bg-darker transition w-[40%]"}
              >
                {loading ? "Loading" : "Add"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
