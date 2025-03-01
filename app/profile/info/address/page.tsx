import UpdateAddressForm from "@/components/ProfileComponents/ProfileInfoComponents/UpdateAddressForm";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

// Metadata Page Title
export const metadata = {
  title: "Print Plus - Change Address",
};

const page = () => {
  return (
    <div className="flex flex-col gap-[39px] text-shadeBlack max-w-[784px]">
      {/* Navigation Title */}
      <div className="flex items-center gap-2">
        <p className="text-sm">profile</p>
        <FaChevronRight className="size-[10px]" />
        <p className="text-[#475569] text-sm">address</p>
      </div>
      {/* Page Header */}
      <p className="text-3xl font-bold">Profile</p>

      {/* Update Address Form */}
      <div className="flex flex-col gap-6">
        <hr />
        <UpdateAddressForm />
        <hr />
      </div>
    </div>
  );
};

export default page;
