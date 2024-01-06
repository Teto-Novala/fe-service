"use client";
import { apiInstance } from "@/axios/instance";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ListAdmin from "./ListAdmin";
import toast from "react-hot-toast";

export default function TransaksiPage() {
  const [data, setData] = useState(null);
  const [dataUnverif, setDataUnverif] = useState(null);
  const [loading, setLoading] = useState(true);
  //   const [loadingUnpaid, setLoadingUnpaid] = useState(true);
  const router = useRouter();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated: () => {
      toast.error("Anda Belum Login");
      redirect("/");
    },
  });
  const token = session?.user?.token;
  if (session?.user?.role === "user") {
    toast.error("Hanya Untuk Admin");
    router.push("/");
  }
  useEffect(() => {
    if (token) {
      apiInstance
        .get("/admin-transaction", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // handle success
          setData(
            res.data.data.filter((data) => data.status === "Diverifikasi")
          );
          setDataUnverif(
            res.data.data.filter(
              (data) => data.status === "Belum Terverifikasi"
            )
          );
          setLoading(false);
        })
        .catch((error) => {
          // handle error
          // alert("anda belum login");
          // console.log(error);
        });
    }
  }, [token]);

  const verifyHandler = async (id) => {
    try {
      await apiInstance.put(`/update-status/${id}`, id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Berhasil Verifikasi");
      setTimeout(() => {
        setDataUnverif((prevData) => {
          return prevData.filter((d) => d._id !== id);
        });
      }, 2000);
    } catch (error) {
      toast.error("Gagal Verifikasi");
      // console.log(error);
    }
  };
  return (
    <div className="pt-16">
      <section className="mt-4 xl:mt-10 px-2 lg:px-5">
        <h1 className="text-center text-2xl md:text-3xl font-bold mb-4 xl:mb-8">
          Transaksi
        </h1>
        <div className="w-full xl:w-1/2 mx-auto p-3 flex flex-col gap-y-5 bg-light items-center">
          {loading && <div className="h-screen">Loading...</div>}
          {loading === false && (
            <>
              <h2>Belum Terverifikasi</h2>
              {dataUnverif.map((data, index) => {
                return (
                  <ListAdmin
                    key={index}
                    data={data}
                    token={token}
                    verifyHandler={verifyHandler}
                  />
                );
              })}
              <h2>Diverifikasi</h2>
              {data.map((data, index) => {
                return <ListAdmin key={index} data={data} token={token} />;
              })}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
