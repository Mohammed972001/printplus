"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import SelectField from "@/components/SharedComponents/SelectField";

interface UpdateAddressFormData {
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  cityId: number;
  zipCode: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
}

interface City {
  value: number;
  text: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdateAddressForm = () => {
  const { data: session, status } = useSession(); // Get the session and its status
  const [cities, setCities] = useState<City[]>([]); // State to store cities
  const [mobileNo, setMobileNo] = useState("");
  const [mobileCode, setMobileCode] = useState("");
  const [mobileIso, setMobileIso] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdateAddressFormData>();

  // Fetch cities when the session token is available
  useEffect(() => {
    if (status === "authenticated" && session?.user?.token) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/cities/1`, {
            headers: {
              "Accept-Language": "ar-SA",
              Authorization: `Bearer ${session.user.token}`,
            },
          });

          if (response.data.success) {
            setCities(response.data.data);
            // Set the default value for cityId
            reset({ cityId: response.data.data[0]?.value });
          }
        } catch (error) {
          console.error("Failed to fetch cities:", error);
          toast.error("فشل في تحميل قائمة المدن. يرجى المحاولة مرة أخرى.");
        }
      };

      fetchCities();
    }
  }, [session?.user?.token, status, reset]); // Add status as a dependency

  // Function to handle phone input change
  const handlePhoneChange = (phone: string, country: any) => {
    setMobileNo(phone);
    setMobileCode(`+${country.dialCode}`);
    setMobileIso(country.countryCode.toUpperCase());
  };

  const onSubmit = async (data: UpdateAddressFormData) => {
    try {
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
        `${API_BASE_URL}/addresses`,
        requestData,
        {
          headers: {
            "Accept-Language": "ar-SA",
            Authorization: `Bearer ${session.user.token}`,
          },
        }
      );

      console.log("Success:", response.data);
      toast.success("تم تحديث العنوان بنجاح!");
      reset();
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
    }
  };

  const isFormValid =
    isValid && mobileNo && mobileCode && mobileIso && watch("cityId");

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name Field */}
      <InputField
        id="fullName"
        label="Full name"
        {...register("fullName", { required: "هذا الحقل مطلوب" })}
        error={errors.fullName?.message}
      />

      {/* Address Line 1 Field */}
      <InputField
        id="addressLine1"
        label="Address"
        {...register("addressLine1", { required: "هذا الحقل مطلوب" })}
        error={errors.addressLine1?.message}
      />

      {/* Mobile Number Field */}
      <InputField
        id="mobileNo"
        isPhoneInput={true}
        label="Mobile Number"
        value={mobileNo}
        onPhoneChange={handlePhoneChange}
      />

      {/* Address Line 2 Field */}
      <InputField
        id="addressLine2"
        label="Additional information (optional)"
        {...register("addressLine2")}
      />

      {/* Postcode and City Fields */}
      <div className="flex items-center gap-2">
        <InputField
          id="zipCode"
          label="Postcode"
          {...register("zipCode", { required: "هذا الحقل مطلوب" })}
          error={errors.zipCode?.message}
        />
        <SelectField
          id="cityId"
          label="City"
          options={cities}
          {...register("cityId", { required: "هذا الحقل مطلوب" })}
          error={errors.cityId?.message}
        />
      </div>

      {/* Save Button */}
      <CustomButton
        label="Save"
        className="!h-[32px] !w-[113px]"
        type="submit"
        disabled={!isFormValid}
      />
    </form>
  );
};

export default UpdateAddressForm;