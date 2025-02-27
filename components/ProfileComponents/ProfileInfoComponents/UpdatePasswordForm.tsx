"use client";
import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";

interface UpdatePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const UpdatePasswordForm = () => {
  const { data: session } = useSession(); // Get the user session
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdatePasswordFormData>();

  const onSubmit = async (data: UpdatePasswordFormData) => {
    try {
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }

      // Ensure new password and confirm new password match
      if (data.newPassword !== data.confirmNewPassword) {
        throw new Error("New password and confirm password do not match.");
      }

      const response = await axios.post(
        `${API_BASE_URL}/auth/change-password`,
        {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            "Accept-Language": "ar-SA",
            Authorization: `Bearer ${session.user.token}`, // Include the token in the header
          },
        }
      );

      console.log("Success:", response.data);
      toast.success("تم تغيير كلمة المرور بنجاح!");
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

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold">Password</p>

      {/* Old Password Field */}
      <InputField
        id="currentPassword"
        label="Old Password"
        type="password"
        {...register("currentPassword", { required: "هذا الحقل مطلوب" })}
        error={errors.currentPassword?.message}
      />

      {/* New Password Field */}
      <InputField
        id="newPassword"
        label="New Password"
        type="password"
        {...register("newPassword", {
          required: "هذا الحقل مطلوب",
          minLength: {
            value: 8,
            message: "كلمة المرور يجب أن تكون على الأقل 8 أحرف",
          },
        })}
        error={errors.newPassword?.message}
      />
      {/* Confirm New Password Field */}
      <InputField
        id="confirmNewPassword"
        label="Confirm New Password"
        type="password"
        {...register("confirmNewPassword", {
          required: "هذا الحقل مطلوب",
          validate: (value) =>
            value === watch("newPassword") || "كلمة المرور غير متطابقة",
        })}
        error={errors.confirmNewPassword?.message}
      />

      {/* Save Button */}
      <CustomButton
        label="Save"
        className="md:!h-[32px] md:!w-[113px]"
        type="submit"
        disabled={!isValid}
      />
    </form>
  );
};

export default UpdatePasswordForm;
