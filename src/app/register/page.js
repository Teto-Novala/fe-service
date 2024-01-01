"use client";

import { registerApi } from "@/axios/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import authImg from "../../../public/img-auth.jpg";
import { useDispatch } from "react-redux";
import { userAction } from "@/store/user-slice";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  dispatch(userAction.addToEmail(email));

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerApi({ name, email, phone, password }).then((res) => {
        // console.log(res);
        alert("sukses, silahkan cek email untuk verifikasi");
        router.push("/verify-user");
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:flex lg:h-screen lg:overflow-y-hidden ">
      <div className="order-2 flex  h-[35%] justify-center lg:h-screen lg:w-[50%]  lg:items-center">
        <div className="relative mt-4 h-[180px] w-[80%] md:h-[500px] lg:h-[90%] lg:w-[90%] ">
          <Image
            alt="image-auth"
            src={authImg}
            fill
            className="rounded-2xl border object-cover object-top lg:object-cover lg:object-top"
            priority="true"
          />
        </div>
      </div>
      <div className="order-1  mt-4 flex items-center justify-center lg:mt-0 lg:w-[50%] lg:scale-[.87]">
        <div className="w-[80%] lg:w-[70%] ">
          <h1 className="mb-2 text-2xl font-bold">Welcome Back 🖐️</h1>
          <p className="mb-2 lg:mb-4">Today is a new day.Its your day.</p>
          <div>
            <form onSubmit={handleRegister}>
              <div className="my-4 flex flex-col">
                <label htmlFor="name" className="mb-2">
                  Name
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name."
                  className="rounded-lg border bg-[#F7FBFF] p-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-4 flex flex-col">
                <label htmlFor="email" className="mb-2">
                  Email
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="mataringan@gmail.com"
                  className="rounded-lg border bg-[#F7FBFF] p-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="my-4 flex flex-col">
                <label htmlFor="phone" className="mb-2">
                  Phone
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Enter your phone."
                  className="rounded-lg border bg-[#F7FBFF] p-2"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="relative my-4 flex flex-col">
                <label htmlFor="password" className="mb-2">
                  Password
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password."
                  className="rounded-lg border bg-[#F7FBFF] p-2"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-4 top-11 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
              <div className="relative my-4 flex flex-col">
                <label htmlFor="confirmPassword" className="mb-2">
                  Confirm Password
                  <span className="text-red-600">*</span>
                </label>
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Enter your confirm password."
                  className="rounded-lg border bg-[#F7FBFF] p-2"
                  onChange={handleConfirmPasswordChange}
                />
                <button
                  type="button"
                  className="absolute right-4 top-11 cursor-pointer"
                  onClick={togglePasswordConfirmVisibility}
                >
                  {showPasswordConfirm ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
                {!passwordMatch && (
                  <p className="text-red-500">Passwords do not match.</p>
                )}
              </div>
              <button
                type="submit"
                className={`mt-3 w-full rounded-xl border bg-[#162D3A] p-3 text-white lg:mt-5 ${
                  isLoading ? "pointer-events-none opacity-70" : ""
                }`}
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </form>
          </div>
          <div className="mt-4 text-center text-[13px] lg:mt-7 ">
            {/* <p>
                            Dont you have an account?
                            <Link
                                href="/register"
                                className="text-blue-700 font-semibold"
                            >
                                Sign Up
                            </Link>
                        </p> */}
            <p className="mt-4 md:mt-10">© 2023 BanyuGO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
