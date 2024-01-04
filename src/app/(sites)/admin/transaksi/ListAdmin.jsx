import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { headers } from "../../../../../next.config";

export default function ListAdmin({ data, token, verifyHandler }) {
  const [show, setShow] = useState(false);

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
            <h2>{data.idBooking.service}</h2>
            <p>{data.idBooking.type_service}</p>
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
          <div className="w-[85%] md:w-[60%] h-[30rem]  overflow-y-scroll fixed top-0 mt-28 z-[99] rounded-md bg-main ">
            <div className="p-4 flex flex-col gap-y-5">
              <table cellPadding={5}>
                <tr className="border border-black">
                  <td className="border border-black">Nama</td>
                  <td>{data.idBooking.name}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Alamat</td>
                  <td>{data.idBooking.address}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Tanggal</td>
                  <td>{data.idBooking.date}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Servis</td>
                  <td>{data.idBooking.service}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Tipe Servis</td>
                  <td>{data.idBooking.type_service}</td>
                </tr>
                <tr className="border border-black">
                  <td className="border border-black">Note</td>
                  <td>{data.idBooking.note}</td>
                </tr>
              </table>
              {/* {data.status === "Belum Terverifikasi" && (
                <>
                  <p>Bukti Pembayaran : </p>
                  <input
                    type="file"
                    className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                    onChange={onSelectFile}
                  />
                </>
              )} */}

              <div className="bg-darker/75 py-3 xl:w-2/3 xl:mx-auto">
                <img
                  src={data.image}
                  alt="bukti pembayaran"
                  className="w-full h-56 object-contain md:h-64 xl:h-80 "
                />
              </div>

              <div className="flex items-center gap-x-3">
                <Button onClick={() => setShow(false)}>Tutup</Button>
                {data.status === "Belum Terverifikasi" && (
                  <Button onClick={() => verifyHandler(data._id)}>
                    Verifikasi
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
