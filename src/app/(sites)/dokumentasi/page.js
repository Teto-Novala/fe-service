"use client";
import { apiInstance } from "@/axios/instance";
import Button from "@/components/Button";
import ImageDokumentasi from "@/components/ImageDokumentasi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// async function getData() {
//   try {
//     const res = await apiInstance.get("/documentation");
//     return res.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function getDataSearch(name) {
//   try {
//     const res = await apiInstance.get(`/documentation?address=${name}`);
//     return res.data.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

export default function Page() {
  const [showAll, setShowAll] = useState(true);
  const [search, setSearch] = useState("");
  const [data, setData] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [dataSearch, setDataSearch] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(true);

  useEffect(() => {
    apiInstance
      .get("/documentation")
      .then((res) => {
        setData(res.data.data);
        setLoadingData(false);
      })
      .catch((error) => {
        setLoadingData(false);
        console.log(error);
      });
  }, []);
  const searchHandler = async () => {
    if (search === "") {
      return;
    }
    apiInstance
      .get(`/documentation?address=${search}`)
      .then((res) => {
        setDataSearch(res.data.data);
        setLoadingSearch(false);
        setShowAll(false);
      })
      .catch((error) => {
        toast.error("Data tidak ada");
        // console.log(error);
      });
  };
  const cancelHandler = () => {
    setSearch("");
    setShowAll(true);
    setSearch("");
  };

  return (
    <section className="pt-20 md:pt-24 px-2 lg:px-5 min-h-screen">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-12">
        Daerah yang pernah kami kunjungi
      </h1>
      <div className="flex items-center justify-center gap-x-2">
        <label className="text-lg">Cari</label>
        <div className="flex items-center justify-center">
          <input
            type="text"
            className=" p-2 text-lg w-[80%]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            onClick={searchHandler}
            className={
              " bg-dark hover:bg-darker transition hover:text-light border-none"
            }
          >
            🔎
          </Button>
        </div>
        {search && (
          <Button
            onClick={cancelHandler}
            className={
              " bg-dark hover:bg-darker transition hover:text-light border-none"
            }
          >
            Cancel
          </Button>
        )}
      </div>
      <div>
        {showAll && (
          <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:flex-wrap w-full md:justify-center md:gap-5 xl:gap-3 md:items-center">
            {loadingData && <div className="h-screen">Loading...</div>}
            {loadingData === false &&
              data.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="hover:scale-105 hover:shadow-xl transition  rounded-lg flex overflow-hidden flex-col gap-y-4 bg-white md:w-1/3 xl:w-1/5 hover:bg-dark"
                  >
                    <div className="py-2">
                      <h2 className="text-xl text-center font-semibold">
                        {data.address}
                      </h2>
                    </div>
                    <div className="w-full">
                      <ImageDokumentasi src={data.image} alt={data.title} />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        {showAll === false && (
          <div className="mt-10 flex flex-col gap-y-4 md:flex-row md:flex-wrap w-full md:justify-center md:gap-5 xl:gap-3 md:items-center">
            {loadingSearch && <div className="h-screen">Loading...</div>}
            {loadingSearch === false ? (
              dataSearch.length === 0 ? (
                <div className="h-screen">Data tidak ada</div>
              ) : (
                dataSearch.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="hover:scale-105 hover:shadow-xl transition  rounded-lg flex overflow-hidden flex-col gap-y-4 bg-white md:w-1/3 xl:w-1/5 hover:bg-dark"
                    >
                      <div className="py-2">
                        <h2 className="text-xl text-center font-semibold">
                          {data.address}
                        </h2>
                      </div>
                      <div className="w-full">
                        <ImageDokumentasi src={data.image} alt={data.title} />
                      </div>
                    </div>
                  );
                })
              )
            ) : undefined}
          </div>
        )}
      </div>
    </section>
  );
}
