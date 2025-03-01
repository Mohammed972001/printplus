"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import { useRouter } from "next/navigation";
import SelectField from "@/components/SharedComponents/SelectField";

interface City {
  value: number;
  text: string;
}

interface CompanyRegisterFormData {
  fullName: string;
  email: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
  cityId: number;
  password: string;
  accountType: number;
  confirmPassword?: string;
  companyName: string;
  vatNumber: string;
  vatName: string;
  vatAddress: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultValues: CompanyRegisterFormData = {
  fullName: "",
  email: "",
  mobileNo: "",
  mobileCode: "",
  mobileIso: "",
  password: "",
  cityId: 2,
  accountType: 2,
  companyName: "",
  vatNumber: "",
  vatName: "",
  vatAddress: "",
};

const CompanyForm = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState(defaultValues.mobileNo);
  const [mobileCode, setMobileCode] = useState(defaultValues.mobileCode);
  const [mobileIso, setMobileIso] = useState(defaultValues.mobileIso);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<CompanyRegisterFormData>({ defaultValues, mode: "onChange" });

  const companyName = watch("companyName");

  // Update the fullName field to match the companyName
  useEffect(() => {
    setValue("fullName", companyName);
  }, [companyName, setValue]);

  // Fetch cities from the API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cities/1`, {
          headers: { "Accept-Language": "ar-SA" },
        });
        if (response.data.success) {
          setCities(response.data.data);
          reset({ cityId: response.data.data[0]?.value });
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast.error("Failed to load cities. Please try again.");
      }
    };
    fetchCities();
  }, [setValue, reset]);

  const handlePhoneChange = (phone: string, country: any) => {
    setMobileNo(phone);
    setMobileCode(`+${country.dialCode}`);
    setMobileIso(country.countryCode.toUpperCase());
  };

  const onSubmit = async (data: CompanyRegisterFormData) => {
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
    if (mobileIso.length !== 2) {
      toast.error("Country ISO code must be exactly 2 characters");
      return;
    }
    if (!/^[A-Za-z]{2}$/.test(mobileIso)) {
      toast.error("Country ISO code must contain only English letters");
      return;
    }

    // Validate city
    if (!data.cityId) {
      toast.error("City is required");
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...requestData } = {
        ...data,
        mobileNo,
        mobileCode,
        mobileIso,
        accountType: 2,
      };

      // Submit registration data to the API
      await axios.post(`${API_BASE_URL}/auth/register`, requestData);
      toast.success("Registration successful! Please check your email.");
      reset();
      router.push("/login");
    } catch (error: any) {
      // Handle API errors
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 mx-4 lg:mx-[79px] w-full justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-[50px] lg:gap-[132px] w-full">
        {/* Left Column */}
        <div className="flex flex-col gap-6 w-full">
          {/* Company Name Input */}
          <InputField
            id="companyName"
            label="Full name*"
            {...register("companyName", {
              required: "Full name is required.",
              validate: (value) => {
                const words = value.trim().split(/\s+/);
                if (!(words.length === 2 || words.length === 3)) {
                  return 'Full name must be in the format "First Last" or "First Middle Last" and contain valid characters.';
                }
                for (let word of words) {
                  if (word.length < 2)
                    return "Each word in the full name must be at least 2 characters long.";
                  if (!/^[A-Za-z\u0600-\u06FF]+$/.test(word)) {
                    return 'Full name must be in the format "First Last" or "First Middle Last" and contain valid characters.';
                  }
                }
                return true;
              },
            })}
            error={errors.companyName?.message}
          />

          {/* Email Input */}
          <InputField
            id="email"
            label="Email*"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
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
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
              maxLength: {
                value: 64,
                message: "Password must not exceed 64 characters",
              },
              validate: {
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) ||
                  "Password must contain at least one uppercase letter",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) ||
                  "Password must contain at least one lowercase letter",
                hasDigit: (value) =>
                  /\d/.test(value) ||
                  "Password must contain at least one digit",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "Password must contain at least one special character",
                noWhiteSpace: (value) =>
                  !/\s/.test(value) || "Password must not contain spaces",
                notCommon: (value) =>
                  ![
                    "password",
                    "123456",
                    "12345678",
                    "qwerty",
                    "abc123",
                  ].includes(value.toLowerCase()) ||
                  "Password is too common and easy to guess",
              },
            })}
            error={errors.password?.message}
          />

          {/* Confirm Password Input */}
          <InputField
            id="confirmPassword"
            label="Confirm Password*"
            type="password"
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword?.message}
          />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-6 w-full">
          {/* City Select Field */}
          <SelectField
            id="cityId"
            label="City*"
            options={cities}
            register={register("cityId", { required: "City is required" })}
            error={errors.cityId?.message}
          />

          {/* Tax Number Input */}
          <InputField
            id="vatNumber"
            label="Tax Number*"
            {...register("vatNumber", { required: "This field is required" })}
            error={errors.vatNumber?.message}
          />

          {/* Tax Name Input */}
          <InputField
            id="vatName"
            label="Tax Name*"
            {...register("vatName", { required: "This field is required" })}
            error={errors.vatName?.message}
          />

          {/* Tax Address Input */}
          <InputField
            id="vatAddress"
            label="Tax Address*"
            {...register("vatAddress", { required: "This field is required" })}
            error={errors.vatAddress?.message}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full">
        <CustomButton
          label={loading ? "Signing up..." : "Sign up"}
          type="submit"
          className="mt-6"
          disabled={!isValid || loading}
        />
      </div>
    </form>
  );
};

export default CompanyForm;
