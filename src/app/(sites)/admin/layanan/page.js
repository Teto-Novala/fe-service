"use client";
import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      alert("anda belum login");
      redirect("/login");
    },
  });
  const token = session?.user?.token;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  if (session?.user?.role === "user") {
    alert("Hanya untuk Admin");
    router.back();
  }
  useEffect(() => {
    if (token) {
      apiInstance
        .get("/service", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // handle success
          setData(res.data.data);
          setLoading(false);
        })
        .catch((error) => {
          // handle error
          // alert("anda belum login");
          console.log(error);
        });
    }
  }, [token]);
  const deleteHandler = async (id) => {
    try {
      const res = await apiInstance.delete(`/service/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Berhasil Menghapus");
      setTimeout(() => {
        setData((prevData) => {
          return prevData.filter((d) => d._id !== id);
        });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20 xl:pt-24 min-h-screen">
      <section className="px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-7">
          Layanan
        </h1>
        <Link
          href={"/admin/layanan/add-layanan"}
          className="bg-dark transition hover:bg-darker px-3 py-2 text-lg rounded"
        >
          Add Layanan
        </Link>
        <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:flex-wrap w-full md:justify-start md:gap-5 xl:gap-3 md:items-center">
          {loading && <div className="h-screen">Loading ...</div>}
          {loading === false &&
            data.map((data, index) => {
              return (
                <div
                  key={index}
                  className="rounded-lg flex flex-col gap-y-4 bg-dark md:w-1/3 xl:w-1/5 hover:bg-darker transition hover:shadow-xl"
                >
                  <div className="w-full">
                    <img
                      src={data.image}
                      className="w-full h-56 md:h-36 object-cover"
                      alt={data.title}
                    />
                  </div>
                  <div className="px-2">
                    <h2 className="text-2xl">{data.name}</h2>
                    <p>{data.typeservice}</p>
                    <p>{data.detailService}</p>
                  </div>
                  <div className="flex items-center justify-center gap-x-5 mb-3">
                    <Button className={"bg-light hover:bg-darker transition"}>
                      <Link href={`/admin/layanan/${data._id}`}>Update</Link>
                    </Button>
                    <Button
                      onClick={() => deleteHandler(data._id)}
                      className={"bg-light hover:bg-darker transition"}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
