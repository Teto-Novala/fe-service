"use client";
import { apiInstance } from "@/axios/instance";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import List from "./List";
import toast from "react-hot-toast";

export default function TransaksiPage() {
  const [data, setData] = useState(null);
  const [dataUnpaid, setDataUnpaid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingUnpaid, setLoadingUnpaid] = useState(true);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      toast.error("anda belum login");
      // alert("anda belum login");
      redirect("/login");
    },
  });
  const token = session?.user?.token;
  // console.log(token);
  useEffect(() => {
    if (token) {
      apiInstance
        .get("/user-payment", {
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

      apiInstance
        .get("/user-transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // handle success
          setDataUnpaid(res.data.data);
          setLoadingUnpaid(false);
        })
        .catch((error) => {
          // handle error
          // alert("anda belum login");
          // console.log(error);
        });
    }
  }, [token]);

  return (
    <div className="pt-16">
      <section className="mt-4 xl:mt-10 px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-4 xl:mb-8">
          Transaksi
        </h1>
        <div className="flex flex-col gap-y-3 mb-5 md:flex-row md:justify-around w-[60%]">
          <div className="flex items-center gap-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-lg"></div>
            <p>Belum Bayar</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-lg"></div>
            <p>Belum Terverifikasi</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-lg"></div>
            <p>Sudah Diverifikasi</p>
          </div>
        </div>
        <div className="w-full xl:w-1/2 mx-auto p-3 flex flex-col gap-y-5 bg-light items-center">
          {loading && <div className="min-h-screen">Loading...</div>}
          {loadingUnpaid === false && (
            <>
              <h2>Belum Bayar</h2>
              {dataUnpaid.map((data, index) => {
                return <List key={index} data={data} token={token} />;
              })}
            </>
          )}
          {loading === false && (
            <>
              <h2>Sudah Bayar</h2>
              {data.map((data, index) => {
                return <List key={index} data={data} token={token} />;
              })}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
