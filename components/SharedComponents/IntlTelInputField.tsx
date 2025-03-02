"use client";
import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef
} from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

interface IntlTelInputFieldProps {
  label?: string;
  value?: string;
  onPhoneChange?: (phone: string, countryData: any) => void;
  error?: string;
}

export interface IntlTelInputFieldRef {
  isValidNumber: () => boolean;
  getNumber: () => string;
}

const IntlTelInputField = forwardRef<IntlTelInputFieldRef, IntlTelInputFieldProps>(
  ({ label, value = "", onPhoneChange, error }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const itiRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      isValidNumber: () => (itiRef.current ? itiRef.current.isValidNumber() : false),
      getNumber: () => (itiRef.current ? itiRef.current.getNumber() : ""),
    }));

    useEffect(() => {
      if (inputRef.current && !itiRef.current) {
        itiRef.current = intlTelInput(inputRef.current, {
          initialCountry: "sa",
          allowDropdown: true,
          preferredCountries: ["sa", "eg", "us"],
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
          nationalMode: false,
          autoHideDialCode: false,
          separateDialCode: false,
          formatOnDisplay: true,
        } as any); 

        if (value) {
          itiRef.current.setNumber(value);
        } else {
          const countryData = itiRef.current.getSelectedCountryData();
          itiRef.current.setNumber(`+${countryData.dialCode}`);
        }

        const handleInputChange = () => {
          if (itiRef.current) {
            const number = itiRef.current.getNumber();
            const countryData = itiRef.current.getSelectedCountryData();
            onPhoneChange && onPhoneChange(number, countryData);
          }
        };

        const handleCountryChange = () => {
          if (itiRef.current && inputRef.current) {
            const countryData = itiRef.current.getSelectedCountryData();
            if (!inputRef.current.value) {
              itiRef.current.setNumber(`+${countryData.dialCode}`);
            }
            const number = itiRef.current.getNumber();
            onPhoneChange && onPhoneChange(number, countryData);
          }
        };

        inputRef.current.addEventListener("input", handleInputChange);
        inputRef.current.addEventListener("countrychange", handleCountryChange);

        return () => {
          if (inputRef.current) {
            inputRef.current.removeEventListener("input", handleInputChange);
            inputRef.current.removeEventListener("countrychange", handleCountryChange);
          }
          if (itiRef.current) {
            itiRef.current.destroy();
            itiRef.current = null;
          }
        };
      }
    }, []); 

    useEffect(() => {
      if (itiRef.current && value) {
        itiRef.current.setNumber(value);
      }
    }, [value]);

    return (
      <div className="flex flex-col justify-start items-start w-full gap-1">
        {label && (
          <label htmlFor="phone-input" className="font-bold text-shadeGray text-sm">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <div
            className={`flex flex-row-reverse border ${
              error ? "border-[#FB7185]" : "border-borderColor"
            } rounded-lg h-[40px]`}
          >
            <div className="w-full flex">
              <input
                id="phone-input"
                ref={inputRef}
                type="tel"
                className="border-none h-[40px] text-left self-center ml-2 w-full focus:outline-none placeholder:text-[#525252] bg-transparent"
              />
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }
);

export default IntlTelInputField;
