import PersonalDetailsForm from "@/components/ProfileComponents/ProfileInfoComponents/PersonalDetailsForm";
import UpdateEmailForm from "@/components/ProfileComponents/ProfileInfoComponents/UpdateEmailForm";
import React from "react";
import { FaChevronRight } from "react-icons/fa";

const page = () => {
  return (
    <div className="flex flex-col gap-[39px] text-shadeBlack max-w-[784px]">
      {/* Navigation Title */}
      <div className="flex items-center gap-2">
        <p className="text-sm">profile</p>
        <FaChevronRight className="size-[10px]" />
        <p className="text-[#475569] text-sm">personal details</p>
      </div>
      {/* Page Header */}
      <p className="text-3xl font-bold">Profile</p>

      {/* Personal Details Form */}
      <div className="flex flex-col gap-6">
        <hr />
        {/* Personal Details Form */}
        <PersonalDetailsForm />
        <hr />
        {/* Update Email Form */}
        <UpdateEmailForm />
        <hr />
      </div>
    </div>
  );
};

export default page;
