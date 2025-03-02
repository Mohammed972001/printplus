"use client";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import IntlTelInputField, { IntlTelInputFieldRef } from "@/components/SharedComponents/IntlTelInputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState, useRef } from "react";
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
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdatePersonalDetails>({
    mode: "onChange",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const mobileNo = watch("mobileNo");

  const phoneInputRef = useRef<IntlTelInputFieldRef>(null);

  const handlePhoneChange = (phone: string, country: any) => {
    setValue("mobileNo", phone, { shouldValidate: true });
    setValue("mobileCode", country?.dialCode ? `+${country.dialCode}` : "", { shouldValidate: true });
    const iso = country && country.iso2 ? country.iso2.toUpperCase() : "";
    setValue("mobileIso", iso, { shouldValidate: true });
  };
  

  const onSubmit = async (data: UpdatePersonalDetails) => {
    try {
      setIsSubmitting(true);

      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }

      if (phoneInputRef.current && !phoneInputRef.current.isValidNumber()) {
        throw new Error("تنسيق رقم الجوال غير صالح");
      }

      const requestData = {
        ...data,
        mobileNo: data.mobileNo,
        mobileCode: data.mobileCode,
        mobileIso: data.mobileIso,
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

      toast.success("تم تحديث البيانات بنجاح!");
      reset();
      setValue("mobileNo", "");
      setValue("mobileCode", "");
      setValue("mobileIso", "");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data?.message || "حدث خطأ، حاول مرة أخرى");
      } else if (error.request) {
        toast.error("لم يتم استلام استجابة من السيرفر، تحقق من اتصالك بالإنترنت.");
      } else {
        toast.error(error.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = isValid && mobileNo;

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold">التفاصيل الشخصية</p>
      <InputField
        id="fullName"
        label="الاسم الكامل"
        {...register("fullName", {
          required: "الاسم الكامل حقل مطلوب",
          pattern: {
            value: /^(([A-Za-z\u0621-\u064A]{2,})\s+([A-Za-z\u0621-\u064A]{2,})(\s+([A-Za-z\u0621-\u064A]{2,}))?)$/,
            message:
              "يجب أن يكون الاسم الكامل بالتنسيق 'الاسم الأول الأخير' أو 'الاسم الأول الأوسط الأخير' ويجب أن يحتوي على أحرف صالحة..",
          },
          validate: (value) => {
            const words = value.trim().split(/\s+/);
            if (words.some((word) => word.length < 2)) {
              return "يجب أن تتكون كل كلمة في الاسم الكامل من حرفين على الأقل";
            }
            return true;
          },
        })}
        error={errors.fullName?.message}
      />
      <IntlTelInputField
        ref={phoneInputRef}
        label="رقم الجوال"
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
