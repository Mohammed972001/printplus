"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";


const CheckEmailContent = () => {
  const searchParams = useSearchParams(); // Get query parameters safely
  const [email, setEmail] = useState<string>("your email");

  useEffect(() => {
    if (searchParams) {
      setEmail(searchParams.get("email") || "your email");
    }
  }, [searchParams]); // Re-run if searchParams change

  return (
    <div className="flex justify-center items-center my-12">
      <div className="flex flex-col justify-center items-center gap-6 md:min-w-[512px]">
        <div className="flex flex-col justify-center items-center gap-6 w-full order-2 md:order-1">
          <h2 className="text-3xl text-shadeBlack font-bold">
            Check your email
          </h2>
          <p className="text-sm text-shadeBlack">
            We have sent a password reset link to{" "}
            <span className="font-bold">{email}</span>
          </p>
        </div>
        <div className="order-1 md:order-2">
          <Image
            src={"/checkmail.gif"}
            alt="checkmail"
            width={218}
            height={218}
            className="w-[90px] h-[90px] md:w-[218px] md:h-[218px]"
          />
        </div>

        <div className="flex justify-center items-center gap-2 order-3">
          <p className="text-shadeBlack">Back to</p>
          <Link href={"/login"} className="font-bold text-shadeBlack">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

const CheckEmailPage = () => {
  return (
    <Suspense fallback={<div className="text-center mt-12">Loading...</div>}>
      <CheckEmailContent />
    </Suspense>
  );
};

export default CheckEmailPage;
