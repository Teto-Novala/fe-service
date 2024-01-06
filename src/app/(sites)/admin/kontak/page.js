"use client";

import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      // alert("anda belum login");
      toast.error("Anda Belum Login");
      redirect("/login");
    },
  });
  const token = session?.user?.token;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  if (session?.user?.role === "user") {
    // alert("Hanya untuk Admin");
    toast.error("Hanya untuk Admin");
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
          // console.log(error);
        });
    }
  }, [token]);
  const deleteHandler = async (id) => {
    if (confirm("Apakah anda yakin ?")) {
      try {
        const res = await apiInstance.delete(`/contact/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // alert("Berhasil Menghapus");
        toast.success("Berhasil Menghapus");
        setTimeout(() => {
          setData((prevData) => {
            return prevData.filter((d) => d._id !== id);
          });
        }, 2000);
      } catch (error) {
        toast.error("Gagal Menghapus");
        // console.log(error);
      }
    } else {
      return;
    }
  };
  const deleteAllHandler = async (id) => {
    if (data.length === 0) {
      toast.error("Data Kosong");
      return;
    }
    if (confirm("Apakah anda yakin ?")) {
      try {
        const res = await apiInstance.delete(`/contact`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // alert("Berhasil Menghapus");
        toast.success("Semua Berhasil Dihapus");
        setTimeout(() => {
          setData([]);
        }, 2000);
      } catch (error) {
        toast.error("Semua Gagal Dihapus");
        // console.log(error);
      }
    } else {
      return;
    }
  };

  return (
    <div className="pt-20 xl:pt-24 min-h-screen">
      <section className="px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-7">
          Contact
        </h1>
        <div>
          <Button
            onClick={deleteAllHandler}
            className={
              "bg-red-500 hover:bg-red-600 transition border-none text-white"
            }
          >
            Delete All
          </Button>
        </div>
        <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:flex-wrap w-full md:justify-center xl:justify-start md:gap-5 xl:gap-3 md:items-center">
          {loading && <div className="h-screen">Loading ...</div>}
          {loading === false &&
            data.map((data, index) => {
              return (
                <div
                  key={index}
                  className="w-full p-4 bg-white flex flex-col gap-y-4"
                >
                  <div className="w-full flex justify-between items-center">
                    <p>Nama</p>
                    <input
                      type="text"
                      value={data.name}
                      readOnly
                      className="border p-2 rounded-lg w-2/3"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p>Email</p>
                    <input
                      type="text"
                      value={data.email}
                      readOnly
                      className="border p-2 rounded-lg w-2/3"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p>Tipe Service</p>
                    <input
                      type="text"
                      value={data.typeservice}
                      readOnly
                      className="border p-2 rounded-lg w-2/3"
                    />
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p>Message</p>
                    <textarea readOnly className="border p-2 rounded-lg w-2/3">
                      {data.message}
                    </textarea>
                  </div>
                  <div className="w-full">
                    <Button
                      onClick={() => deleteHandler(data._id)}
                      className={
                        "bg-red-500 hover:bg-red-600 transition border-none w-full text-white"
                      }
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
