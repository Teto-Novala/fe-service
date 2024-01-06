"use client";
import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const params = useParams();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      // alert("Anda Belum Login");
      toast.error("Anda Belum Login");
      redirect("/login");
    },
  });
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [dataForm, setDataForm] = useState({
    name: "",
    detailService: "",
    typeservice: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const token = session?.user?.token;
  const router = useRouter();
  if (session?.user?.role === "user") {
    toast.error("Hanya untuk Admin");
    router.back();
  }

  useEffect(() => {
    if (token) {
      apiInstance
        .get(`/service/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // handle success
          setDataForm(res.data.data);
          setLoading(false);
          setSelectedFile(res.data.data.image);
        })
        .catch((error) => {
          // handle error
          // alert("anda belum login");
          // console.log(error);
        });
    }
  }, [token]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      // setSelectedFile(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(e.target.files[0]);

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(objectUrl);
    setDataForm({ ...dataForm, image: e.target.files[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingUpdate(true);
    try {
      const res = await apiInstance.put(`/service/${params.id}`, dataForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Berhasil Mengupdate");
      setLoadingUpdate(false);
      router.push("/admin/layanan");
    } catch (error) {
      setLoadingUpdate(false);
      toast.error("Gagal Mengupdate");
      // console.log(error);
    }
  };

  return (
    <div className="pt-20 xl:pt-24 min-h-screen">
      <section className="px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-7">
          Update Layanan Layanan
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
              value={dataForm.typeservice}
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
                  src={selectedFile}
                  alt="gambar info"
                  className="w-full h-56 object-contain md:h-64 xl:h-80 "
                />
              </div>
            )}
            <div className="w-full flex items-center justify-center gap-x-4">
              <Button
                type="submit"
                className={"bg-dark hover:bg-darker transition w-[40%]"}
              >
                {loading === true && loadingUpdate === false
                  ? "Loading"
                  : loading === false && loadingUpdate === true
                  ? "Loading"
                  : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
