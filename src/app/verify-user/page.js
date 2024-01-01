"use client";

import { resendOtp, verifyUser } from "@/axios/auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { userAction } from "@/store/user-slice";

function VerifyOTP() {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.user.email);
  const role = session?.data?.user?.role;

  //   console.log(email);

  const [otp, setOTP] = useState("");
  const [countdown, setCountdown] = useState(0);

  const handleVerify = async () => {
    try {
      verifyUser({ otp }).then((res) => {
        // console.log(res);
        alert("Berhasil verifikasi");
        dispatch(userAction.removeEmail());
        setTimeout(() => {
          if (role === "admin" || role === "super admin") {
            router.push("/admin/destinasi");
          } else {
            router.push("/destinasi");
          }
        }, 1000);
      });
      // if (response.data.status === "success") {
      //     toast.success("OTP verified successfully!");
      //     setTimeout(() => {
      //         router.push("/login");
      //     }, 2000);
      // }
    } catch (error) {
      // toast.error(error.response.data.message);
      console.log(error.response.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      setCountdown(60);
      if (email) {
        resendOtp({ email }).then((res) => {
          // console.log(res);
          alert("OTP sudah dikirim, silahkan cek email");
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown === 0) {
        clearInterval(timer);
      }

      return () => clearInterval(timer);
    }
  }, [countdown]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full rounded-lg bg-white p-6 shadow-md sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="mb-4 text-center text-2xl font-semibold">Verify OTP</h1>
        <div className="flex justify-center space-x-2">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <input
              key={index}
              type="number"
              className="h-12 w-12 rounded-lg border text-center text-2xl focus:border-blue-500 focus:outline-none"
              min="0"
              max="9"
              value={otp[index - 1] || ""}
              onChange={(e) => {
                const newOTP =
                  otp.slice(0, index - 1) + e.target.value + otp.slice(index);
                setOTP(newOTP.slice(0, 6));
              }}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          <button
            className="w-full rounded-lg bg-blue-500  py-2 text-white hover:bg-blue-600 focus:outline-none"
            onClick={handleVerify}
          >
            Verify
          </button>
          <button
            className={`w-full py-2 ${
              countdown > 0
                ? "cursor-not-allowed bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            } rounded-lg text-white focus:outline-none`}
            onClick={handleResendOtp}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend OTP in ${countdown}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
