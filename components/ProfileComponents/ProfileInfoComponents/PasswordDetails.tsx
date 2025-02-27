import Link from "next/link";
import React from "react";

const PasswordDetails = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <p className="text-lg font-semibold">Password</p>
        <Link href={"/profile/info/password"} className="text-sm text-[#475569] font-semibold">
          Change password
        </Link>
      </div>
      <div className="text-base font-semibold">• • • • • • • •</div>
    </div>
  );
};

export default PasswordDetails;
