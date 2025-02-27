"use client";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  register?: any;
  isPhoneInput?: boolean;
  error?: string;
  onPhoneChange?: (phone: string, countryData: any) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  register,
  isPhoneInput = false,
  error,
  onPhoneChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="flex flex-col justify-start items-start w-full gap-1">
      <label htmlFor={id} className="font-bold text-shadeGray text-sm">
        {label}
      </label>
      <div className="relative w-full">
        {isPhoneInput ? (
          <div className="flex flex-row-reverse border border-borderColor rounded-lg h-[48px] md:h-auto">
            <PhoneInput
              country={"sa"} // Default country (Saudi Arabia)
              enableSearch={true}
              enableAreaCodes={false}
              value={phoneNumber}
              onChange={(phone, country) => {
                setPhoneNumber(phone);
                onPhoneChange && onPhoneChange(phone, country);
              }}
              inputClass="!border-0 text-left self-center !ml-2 !w-full !focus:outline-none !placeholder:text-[#525252] !bg-transparent"
              containerClass="w-full flex"
              buttonClass="!bg-transparent !w-[79px] !ps-4"
              dropdownClass="!bg-white !border !border-[#E3E3E3] !rounded-md"
              dropdownStyle={{
                position: "absolute",
                top: "auto", // Adjust based on available space
                bottom: "100%", // Open upwards
                left: 0,
                zIndex: 9999,
              }}
            />
          </div>
        ) : (
          <>
            <input
              type={type === "password" && showPassword ? "text" : type}
              id={id}
              placeholder={placeholder}
              value={value}
              {...register}
              {...rest}
              className="border border-borderColor h-[48px] md:h-[36px] rounded-lg focus:outline-none placeholder:text-[#525252] w-full py-2 ps-2"
            />
            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 flex items-center text-gray-500 ${error ? "top-2" : "inset-y-0"}`}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            )}
            {error && <p className="text-red-500">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default InputField;
