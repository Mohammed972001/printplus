import UpdatePasswordForm from "@/components/ProfileComponents/ProfileInfoComponents/UpdatePasswordForm";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Change Password",
};

const page = () => {
  return (
    <div className="flex flex-col gap-[39px] text-shadeBlack max-w-[784px]">
      {/* Navigation Title */}
      <div className="flex items-center gap-2">
        <p className="text-sm">profile</p>
        <FaChevronRight className="size-[10px]" />
        <p className="text-[#475569] text-sm">password</p>
      </div>
      {/* Page Header */}
      <p className="text-3xl font-bold">Profile</p>

      {/* Change Password Form */}
      <div className="flex flex-col gap-6">
        <hr />
        <UpdatePasswordForm />
        <hr />
      </div>
    </div>
  );
};

export default page;
