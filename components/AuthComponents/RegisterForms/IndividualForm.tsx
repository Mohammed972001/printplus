"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import { useRouter } from "next/navigation";

interface IndividualRegisterFormData {
  fullName: string;
  email: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
  cityId: number;
  password: string;
  accountType: number;
  confirmPassword?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultValues = {
  fullName: "",
  email: "",
  mobileNo: "",
  mobileCode: "",
  mobileIso: "",
  password: "",
  cityId: 2,
  accountType: 1,
};

const commonPasswords = ["password", "123456", "12345678", "qwerty", "abc123"];

const isCommonPassword = (password: string) => {
  return commonPasswords.includes(password.toLowerCase());
};

const IndividualForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<IndividualRegisterFormData>({ defaultValues, mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [mobileNo, setMobileNo] = useState(defaultValues.mobileNo);
  const [mobileCode, setMobileCode] = useState(defaultValues.mobileCode);
  const [mobileIso, setMobileIso] = useState(defaultValues.mobileIso);

  const handlePhoneChange = (phone: string, country: any) => {
    setMobileNo(phone);
    setMobileCode(`+${country.dialCode}`);
    setMobileIso(country.countryCode.toUpperCase());
  };

  const onSubmit = async (data: IndividualRegisterFormData) => {
    // Validate mobile code
    if (!mobileCode) {
      toast.error("Country code is required");
      return;
    }
    if (!/^\+\d+$/.test(mobileCode)) {
      toast.error("Invalid country code");
      return;
    }

    // Validate mobile number
    if (!mobileNo) {
      toast.error("Mobile number is required");
      return;
    }
    if (!/^\d{6,15}$/.test(mobileNo)) {
      toast.error("Invalid mobile number format");
      return;
    }

    // Validate mobile ISO code
    if (!mobileIso) {
      toast.error("Country ISO code is required");
      return;
    }
    if (!/^[A-Za-z]{2}$/.test(mobileIso)) {
      toast.error("Country ISO code must be exactly 2 letters");
      return;
    }

    // Validate city and account type
    if (!data.cityId) {
      toast.error("City is required");
      return;
    }
    if (data.accountType !== 1) {
      toast.error("Account type must be individual");
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...requestData } = {
        ...data,
        mobileNo,
        mobileCode,
        mobileIso,
      };

      // Submit registration data to the API
      const response = await axios.post(`${API_BASE_URL}/auth/register`, requestData);
      toast.success("Registration successful! Please check your email.");
      reset();
      router.push("login");
    } catch (error: any) {
      // Handle API errors
      if (error.response) {
        toast.error(error.response.data?.message || "An error occurred, please try again.");
      } else if (error.request) {
        toast.error("No response received from the server. Please check your internet connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6 w-full md:w-[485px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 w-full">
        {/* Full Name Input */}
        <InputField
          id="fullName"
          label="Full name*"
          {...register("fullName", {
            required: "Full name is required.",
            validate: (value) => {
              const words = value.trim().split(/\s+/);
              if (!(words.length === 2 || words.length === 3)) {
                return 'Full name must be in the format "First Last" or "First Middle Last" and contain valid characters.';
              }
              for (let word of words) {
                if (word.length < 2) return "Each word in the full name must be at least 2 characters long.";
                if (!/^[A-Za-z\u0600-\u06FF]+$/.test(word)) {
                  return 'Full name must be in the format "First Last" or "First Middle Last" and contain valid characters.';
                }
              }
              return true;
            },
          })}
          error={errors.fullName?.message}
        />

        {/* Email Input */}
        <InputField
          id="email"
          label="Email*"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          error={errors.email?.message}
        />

        {/* Mobile Number Input */}
        <InputField
          id="mobileNo"
          isPhoneInput={true}
          label="Mobile Number*"
          value={mobileNo}
          onPhoneChange={handlePhoneChange}
        />

        {/* Password Input */}
        <InputField
          id="password"
          label="Password*"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 8, message: "Password must be at least 8 characters long" },
            maxLength: { value: 64, message: "Password must not exceed 64 characters" },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
              hasLowercase: (value) =>
                /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
              hasDigit: (value) =>
                /\d/.test(value) || "Password must contain at least one digit",
              hasSpecial: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
              noWhitespace: (value) =>
                !/\s/.test(value) || "Password must not contain spaces",
              notCommon: (value) =>
                !isCommonPassword(value) || "Password is too common and easy to guess",
            },
          })}
          error={errors.password?.message}
        />

        {/* Confirm Password Input */}
        <InputField
          id="confirmpassword"
          label="Confirm Password*"
          type="password"
          {...register("confirmPassword", {
            required: "This field is required",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />
      </div>

      {/* Submit Button */}
      <CustomButton
        label={loading ? "Signing up..." : "Sign up"}
        type="submit"
        className="mt-6"
        disabled={!isValid || loading}
      />
    </form>
  );
};

export default IndividualForm;