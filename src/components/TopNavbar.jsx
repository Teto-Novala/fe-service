"use client";
import { IconUserCircle } from "@tabler/icons-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import Button from "./Button";

export default function TopNavbar() {
  const { data: session } = useSession();
  const [hidden, setHidden] = useState(true);
  const token = session?.user?.token;

  function logoutHandler(e) {
    setHidden(!hidden);
  }

  return (
    <div className="navbar fixed z-[99] top-0 bg-dark">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/home"} className="xl:text-xl">
                Home
              </Link>
            </li>
            <li>
              <Link href={"/dokumentasi"} className="xl:text-xl">
                Dokumentasi
              </Link>
            </li>
            <li>
              <Link href={"/layanan"} className="xl:text-xl">
                Layanan
              </Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Logo</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/home"}>Home</Link>
          </li>
          <li>
            <Link href={"/dokumentasi"}>Dokumentasi</Link>
          </li>
          <li>
            <Link href={"/layanan"}>Layanan</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {token === undefined ? (
          <Link href={"/login"} className="btn">
            Login
          </Link>
        ) : (
          <>
            <button onClick={logoutHandler}>
              <IconUserCircle className="w-10 h-10 xl:w-10 xl:h-10" />
            </button>
            <ul
              className={`bg-light ${
                hidden ? "hidden" : "flex"
              } absolute z-[1] top-[4.4rem] right-0 w-1/2 md:w-1/3 xl:w-1/4 rounded-lg p-2 xl:py-2`}
            >
              <div className="w-full flex flex-col justify-center items-center gap-y-4">
                <Link
                  className="w-full md:w-2/3 text-center py-3 bg-dark hover:bg-darker transition rounded-lg"
                  href={"/transaksi"}
                >
                  Transaksi
                </Link>
                <li className="w-full md:w-2/3">
                  <Button
                    onClick={() => signOut()}
                    className={"w-full bg-dark hover:bg-darker transition"}
                  >
                    Logout
                  </Button>
                </li>
              </div>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
