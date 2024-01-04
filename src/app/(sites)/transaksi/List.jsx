import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function List({ data, token }) {
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  const router = useRouter();

  // create a preview as a side effect, whenever selected file is changed
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
  };

  const payHandler = async () => {
    try {
      const res = await apiInstance.put(
        `/pay-transaction/${data._id}`,
        {
          image: selectedFile,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Data Berhasil Dikirim");
      setShow(false);
      redirect("/transaksi");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`group w-full p-2 rounded-lg hover:bg-slate-400 transition justify-between flex ${
          data.status === "Diverifikasi"
            ? "bg-green-500"
            : data.image === ""
            ? "bg-red-500"
            : "bg-yellow-500"
        } `}
      >
        <>
          <div className="group-hover:text-light">
            <h2>{data.booking.service}</h2>
            <p>{data.booking.type_service}</p>
          </div>
          <Button
            onClick={() => setShow(true)}
            className={
              "bg-dark hover:bg-darker transition hover:text-light border-none"
            }
          >
            Check
          </Button>
        </>
      </div>
      {show && (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/25 z-[98] blur-3xl backdrop-blur-sm "></div>
          <div className="w-[85%] md:w-[60%] h-[30rem] overflow-y-scroll fixed top-0 mt-28 z-[99] rounded-md bg-main ">
            <div className="p-4 flex flex-col gap-y-5">
              <table cellPadding={5}>
                <tr className="border border-black">
                  <td className="border border-black">Nama</td>
                  <td>{data.booking.name}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Alamat</td>
                  <td>{data.booking.address}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Tanggal</td>
                  <td>{data.booking.date}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Servis</td>
                  <td>{data.booking.service}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Tipe Servis</td>
                  <td>{data.booking.type_service}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Note</td>
                  <td>{data.booking.note}</td>
                </tr>
              </table>
              {data.status === "Belum Terverifikasi" && (
                <>
                  <p>Bukti Pembayaran : </p>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                    onChange={onSelectFile}
                  />
                </>
              )}
              {selectedFile && (
                <div className="bg-darker/75 py-3 xl:w-2/3 xl:mx-auto">
                  <img
                    src={preview}
                    alt="bukti pembayaran"
                    className="w-full h-56 object-contain md:h-64 xl:h-80 "
                  />
                </div>
              )}
              <div className="flex items-center gap-x-3">
                <Button onClick={() => setShow(false)}>Tutup</Button>
                {data.status === "Belum Terverifikasi" && (
                  <Button onClick={payHandler}>Bayar</Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
