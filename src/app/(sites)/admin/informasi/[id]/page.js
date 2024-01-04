"use client";
import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import InputForm from "@/components/InputForm";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const params = useParams();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      alert("Anda Belum Login");
      redirect("/login");
    },
  });
  const [loading, setLoading] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [dataForm, setDataForm] = useState({
    title: "",
    description: "",
    date: "",
    image: "",
  });
  const [selectedFile, setSelectedFile] = useState();
  const token = session?.user?.token;
  const router = useRouter();
  if (session?.user?.role === "user") {
    alert("Hanya untuk Admin");
    router.back();
  }
  useEffect(() => {
    if (token) {
      apiInstance
        .get(`/information/${params.id}`, {
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
          console.log(error);
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
      const res = await apiInstance.put(`/information/${params.id}`, dataForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Berhasil Mengupdate");
      setLoadingUpdate(false);
      router.push("/admin/informasi");
    } catch (error) {
      setLoadingUpdate(false);
      alert("Error");
      console.log(error);
    }
  };

  return (
    <div className="pt-20 xl:pt-24 min-h-screen">
      <section className="px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-7">
          Update Informasi
        </h1>
        <div>
          <form
            onSubmit={submitHandler}
            className="w-full bg-light flex flex-col justify-center items-center gap-y-2"
          >
            {loading && <div className="h-screen">Loading...</div>}
            {loading === false && (
              <>
                <InputForm
                  label={"Judul"}
                  placeholder={"Judul"}
                  value={dataForm.title}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, title: e.target.value })
                  }
                />
                <InputForm
                  label={"Deskripsi"}
                  placeholder={"Deskripsi"}
                  value={dataForm.description}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, description: e.target.value })
                  }
                />
                <InputForm
                  label={"tangal"}
                  type={"date"}
                  onChange={(e) =>
                    setDataForm({ ...dataForm, date: e.target.value })
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
                      alt="bukti pembayaran"
                      className="w-full h-56 object-contain md:h-64 xl:h-80 "
                    />
                  </div>
                )}
                <div className="w-full flex items-center justify-center gap-x-4">
                  <Button
                    type="submit"
                    className={"bg-dark hover:bg-darker transition w-[40%]"}
                  >
                    {/* {loading ? "Loading" : "Update"} */}
                    {loading === true && loadingUpdate === false
                      ? "Loading"
                      : loading === false && loadingUpdate === true
                      ? "Loading"
                      : "Update"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
