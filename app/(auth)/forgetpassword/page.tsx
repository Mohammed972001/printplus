"use client";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ForgetPasswordFormData {
  email: string;
}

const ForgetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ForgetPasswordFormData>({ mode: "onChange" });

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: ForgetPasswordFormData) => {
    setLoading(true);
    setShowMessage(false);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forget-password`,
        { email: data.email },
        {
          headers: {
            "Accept-Language": "ar-SA",
          },
        }
      );

      const { success, message } = response.data;

      if (success) {
        router.push(`/checkemail?email=${encodeURIComponent(data.email)}`);
      } else {
        setMessage(message);
        setShowMessage(true);
      }
    } catch (error: any) {
      console.error("Forget Password Error:", error);

      if (error.response) {
        setMessage(error.response.data?.message || "An error occurred, please try again.");
      } else if (error.request) {
        setMessage("No response from server, please check your internet connection.");
      } else {
        setMessage("An unexpected error occurred, please try again.");
      }

      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-8 md:my-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-center gap-6 md:min-w-[512px]"
      >
        <div className="flex flex-col justify-center items-center gap-6 w-full">
          <h2 className="text-3xl text-shadeBlack font-bold">
            Forgot your password?
          </h2>
          <p className="text-sm text-shadeBlack">
            We'll email you a link to recover your account.
          </p>
        </div>

        {showMessage && (
          <div className="w-full text-[#BE123C] text-sm text-center">
            {message}
          </div>
        )}

        <InputField
          id="email"
          label="Email*"
          type="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format.",
            },
          })}
          error={errors.email?.message}
        />

        <CustomButton
          label="Get a reset link"
          type="submit"
          disabled={!isValid}
          isLoading={loading}
        />

        <Link href="/login" className="font-bold text-shadeBlack mt-2">
          Log in
        </Link>
      </form>
    </div>
  );
};

export default ForgetPasswordPage;
