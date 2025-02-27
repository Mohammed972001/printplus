import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";

interface SelectFieldProps {
  id: string;
  label: string;
  options: { value: number | string; text: string }[];
  register?: UseFormRegisterReturn;
  error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  id,
  label,
  options,
  register,
  error,
}) => {
  return (
    <div className="flex flex-col justify-start items-start w-full gap-1 relative">
      <label htmlFor={id} className="font-bold text-shadeGray text-sm">
        {label}
      </label>
      <div className="relative w-full">
        <select
          id={id}
          {...register}
          className="border border-borderColor h-[48px] md:h-[36px] rounded-lg text-sm focus:outline-none w-full py-2 ps-2 appearance-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="text-gray-900">
              {option.text}
            </option>
          ))}
        </select>
        {/* Custom Dropdown Arrow */}
        <FaChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;