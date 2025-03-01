"use client";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // Disable the button if any field is empty
  const isDisabled =
    email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "";

  // Function to validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate email
    if (email.trim() === "") {
      setMessage("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Invalid email format");
      return;
    }

    // Validate password and confirm password
    if (password !== confirmPassword) {
      setMessage("Password and confirm password do not match.");
      return;
    }

    setMessage("Password reset successfully.");
    setIsSuccessful(true);
    // You can add additional logic here, such as redirecting to the login page
  };

  // Function to navigate to the login page
  const handleNavigate = () => {
    router.push("/login");
  };

  return (
    <div className="flex justify-center items-center my-8 md:my-12">
      {!isSuccessful && (
        <div className="flex flex-col justify-center items-center">
          <div className="w-full flex flex-col justify-center items-center gap-6 md:min-w-[480px]">
            <h2 className="text-3xl text-shadeBlack font-bold">
              Choose a new password
            </h2>
            <p className="text-shadeBlack">
              Create a new password for your account.
            </p>
            <form className="w-full flex flex-col items-center gap-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <InputField
                id="email"
                label="Email*"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              {/* Password Input */}
              <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* Confirm Password Input */}
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              {/* Reset Password Button */}
              <CustomButton
                label="Change my password"
                type="submit"
                disabled={isDisabled}
                className="w-[315px]"
              />

              {/* Link to Login Page */}
              <Link href={"/login"} className="font-bold text-shadeBlack mt-2">
                Log in
              </Link>

              {/* Display Message */}
              {message && (
                <div className="mt-4 text-[#4B5563] font-medium">{message}</div>
              )}
            </form>
          </div>
        </div>
      )}

      {isSuccessful && (
        <div className="gap-6 flex justify-center items-center flex-col">
          <div className="flex justify-center items-center">
            <p className="font-bold text-2xl text-shadeBlack">Password updated!</p>
          </div>
          <p className="text-shadeBlack">
            Your password has been updated successfully!
          </p>
          <CustomButton label="Log in" onClick={handleNavigate} />
        </div>
      )}
    </div>
  );
};

export default ResetPassword;