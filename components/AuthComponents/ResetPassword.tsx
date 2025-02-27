"use client";
import React, { useState } from "react";
import InputField from "../SharedComponents/InputField";
import CustomButton from "../SharedComponents/CustomButton";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const isDisabled = password.trim() === "" || confirmPassword.trim() === "";

  // Handle Reset Password form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (password === confirmPassword) {
      setMessage("تم إعادة تعيين كلمة المرور بنجاح.");
      // Handle success logic (e.g., redirect to login or homepage)
    } else {
      setMessage("كلمة المرور وتأكيد كلمة المرور لا تتطابق.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Reset Password Input */}
      <InputField
        id="password"
        label="كلمة المرور"
        type="password"
        placeholder="أدخل كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Confirm Reset Password Input */}
      <InputField
        id="confirmPassword"
        label="تأكيد كلمة المرور"
        type="password"
        placeholder="أدخل كلمة المرور"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {/* Reset Password Button */}
      <CustomButton
        label="إعادة ضبط كلمة المرور"
        type="submit"
        disabled={isDisabled}
        className="w-[315px]"
        onClick={handleSubmit}
      />

      {/* Message Display */}
      {message && (
        <div className="mt-4 text-[#4B5563] font-medium">{message}</div>
      )}
    </div>
  );
};

export default ResetPassword;
