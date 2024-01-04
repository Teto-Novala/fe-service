"use client";

import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        .get("/contact", {
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
    console.log("id delete", id);
    // try {
    //   const res = await apiInstance.delete(`/service/${id}`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    //   alert("Berhasil Menghapus");
    //   setTimeout(() => {
    //     setData((prevData) => {
    //       return prevData.filter((d) => d._id !== id);
    //     });
    //   }, 2000);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="pt-20 xl:pt-24 min-h-screen">
      <section className="px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-7">
          Contact
        </h1>
        <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:flex-wrap w-full md:justify-center xl:justify-start md:gap-5 xl:gap-3 md:items-center">
          {loading && <div className="h-screen">Loading ...</div>}
          {loading === false &&
            data.map((data, index) => {
              return (
                <div
                  key={index}
                  className="rounded-lg p-3 flex flex-col  gap-y-4 bg-dark md:w-1/3 xl:w-1/5 md:overflow-x-auto hover:bg-darker transition hover:shadow-xl"
                >
                  <table className="w-full" cellPadding={5}>
                    <tr className="border border-black">
                      <td className="border border-black">Tipe Service</td>
                      <td>{data.typeservice}</td>
                    </tr>
                    <tr className="border border-black">
                      <td className="border border-black">Nama</td>
                      <td>{data.name}</td>
                    </tr>
                    <tr className="border border-black">
                      <td className="border border-black">Email</td>
                      <td>{data.email}</td>
                    </tr>
                    <tr className="border border-black">
                      <td className="border border-black">Message</td>
                      <td>{data.message}</td>
                    </tr>
                  </table>
                  <div className="flex items-center justify-center gap-x-5 mb-3">
                    {/* <Button className={"bg-light hover:bg-darker transition"}>
                  <Link href={`/admin/kontak/${data._id}`}>Update</Link>
                </Button> */}
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
