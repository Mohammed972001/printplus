"use client";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface UpdatePersonalDetails {
  fullName: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PersonalDetailsForm = () => {
  const { data: session, status } = useSession(); // Get the session and its status
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdatePersonalDetails>({
    mode: "onChange", // Validate form on change
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Watch mobileNo, mobileCode, and mobileIso to include them in form validation
  const mobileNo = watch("mobileNo");
  const mobileCode = watch("mobileCode");
  const mobileIso = watch("mobileIso");

  // Function to handle phone input change
  const handlePhoneChange = (phone: string, country: any) => {
    setValue("mobileNo", phone, { shouldValidate: true });
    setValue("mobileCode", `+${country.dialCode}`, { shouldValidate: true });
    setValue("mobileIso", country.countryCode.toUpperCase(), {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: UpdatePersonalDetails) => {
    try {
      setIsSubmitting(true);

      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }

      // Validate phone input
      if (!mobileNo || !mobileCode || !mobileIso) {
        throw new Error("يرجى إدخال رقم الهاتف بشكل صحيح.");
      }

      const requestData = {
        ...data,
        mobileNo,
        mobileCode,
        mobileIso,
      };

      const response = await axios.post(
        `${API_BASE_URL}/users/update-info`,
        requestData,
        {
          headers: {
            "Accept-Language": "ar-SA",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      console.log("Success:", response.data);
      toast.success("تم تحديث البيانات بنجاح!");

      // Reset form and state
      reset();
      setValue("mobileNo", "");
      setValue("mobileCode", "");
      setValue("mobileIso", "");
    } catch (error: any) {
      console.error("Error:", error);

      if (error.response) {
        toast.error(error.response.data?.message || "حدث خطأ، حاول مرة أخرى");
      } else if (error.request) {
        toast.error(
          "لم يتم استلام استجابة من السيرفر، تحقق من اتصالك بالإنترنت."
        );
      } else {
        toast.error(error.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = isValid && mobileNo && mobileCode && mobileIso;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold">Personal details</p>
      <InputField
        id="fullName"
        label="Full name"
        {...register("fullName", { required: "هذا الحقل مطلوب" })}
        error={errors.fullName?.message}
      />
      <InputField
        id="mobileNo"
        isPhoneInput={true}
        label="Mobile Number"
        value={mobileNo}
        onPhoneChange={handlePhoneChange}
        error={errors.mobileNo?.message}
      />
      <CustomButton
        label={isSubmitting ? "Saving..." : "Save"}
        className="md:!h-[32px] md:!w-[113px]"
        type="submit"
        disabled={!isFormValid || isSubmitting}
      />
    </form>
  );
};

export default PersonalDetailsForm;