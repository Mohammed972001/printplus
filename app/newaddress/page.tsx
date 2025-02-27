import MainFooter from "@/components/Footer/MainFooter";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import React from "react";

const page = () => {
  return (
    <div>
      {" "}
      <div className="px-10 py-12">
        <div className="flex flex-col gap-[22.22px] px-[71.45px]">
          {/* Name and Mobile Number */}
          <div className="flex items-center gap-[22.22px]">
            <InputField
              id="name"
              label="الإسم بالكامل"
              placeholder="عبدالله بامحمد"
            />
            <InputField
              id="mobileNo"
              isPhoneInput={true}
              label="رقم الجوال"
              placeholder="455136458"
            />
          </div>
          {/* Address */}
          <div>
            <InputField
              id="address"
              label="العنوان"
              placeholder="28 شارع الفن"
            />
          </div>
          {/* City and Neighborhood */}
          <div className="flex items-center gap-[22.22px]">
            <InputField id="city" label="المدينة" placeholder="ادخل المدينة" />
            <InputField
              id="neighborhood"
              label="الحي"
              placeholder="ادخل الحي"
            />
          </div>
          {/* Notes */}
          <div>
            <InputField
              id="notes"
              label="ملاحظات"
              placeholder="اضف ملاحظاتك ان وجدت"
            />
          </div>
          {/* Submit Button */}
          <div className="self-end">
            <CustomButton
              label=" ‏‏إضافة عنوان "
              className="!min-w-[141.15px] w-[158px] h-[40px] rounded-[476.87px] px-[45.08px] text-[11px]"
            />
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  );
};

export default page;
