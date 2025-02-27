"use client";

import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: "/",
    });

    if (result?.error) {
      toast.error(result.error);
      setError(result.error);
      return;
    }

    toast.success("تم تسجيل الدخول بنجاح!", { autoClose: 1000 });

    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center my-8 px-4 md:px-10 md:my-12">
      <form
        className="flex flex-col justify-center items-center gap-6 w-full md:w-[480px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl text-shadeBlack font-bold">Sign in</h2>
        <InputField
          id="email"
          label="Email*"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <div className="w-full flex flex-col items-center gap-2">
          <InputField
            id="password"
            label="Password*"
            type="password"
            {...register("password", {
              required: "password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters.",
              },
              maxLength: {
                value: 64,
                message: "Password must be at most 64 characters.",
              },
            })}
          />

          <Link href="/forgetpassword" className="text-xs text-shadeBlack self-end">
            Forgot password?
          </Link>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <CustomButton
          type="submit"
          label={isSubmitting ? "Loging in..." : "Log in"}
          disabled={isSubmitting}
        />

        {error && <p className="text-red-500">{error}</p>}

        <div className="w-full flex justify-center items-center gap-2 mt-2">
          <p className="text-shadeBlack">Don’t have an account?</p>
          <Link href="/register" className="font-bold text-shadeBlack">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
