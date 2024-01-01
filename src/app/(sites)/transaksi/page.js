"use client";
import { apiInstance } from "@/axios/instance";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import List from "./List";

export default function TransaksiPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const token = session?.user?.token;
  // console.log(token);
  useEffect(() => {
    if (token) {
      apiInstance
        .get("/transaction", {
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
          alert("anda belum login");
          console.log(error);
        });
    }
  }, [token]);

  return (
    <div className="pt-16 h-screen">
      <section className="mt-4 xl:mt-10 px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-4 xl:mb-8">
          Transaksi
        </h1>
        <div className="w-full xl:w-1/2 mx-auto p-3 flex flex-col gap-y-5 bg-light items-center">
          {loading && <div>Loading...</div>}
          {loading === false &&
            data.map((data, index) => {
              return <List key={index} data={data} token={token} />;
            })}
        </div>
      </section>
    </div>
  );
}
