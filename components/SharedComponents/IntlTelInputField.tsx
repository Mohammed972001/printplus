"use client";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/styles";

export interface PhoneData {
  phoneNumber: string;
  mobileCode: string;
  mobileIso: string;
  isValid: boolean;
  errorMessage: string;
}

export interface PhoneInputWithValidationRef {
  getPhoneData: () => PhoneData;
}

interface PhoneInputWithValidationProps {
  label?: string;
  initialValue?: string;
  initOptions?: any;
}

const libraryErrorMap = [
  "رقم غير صالح",         // code 0
  "رمز الدولة غير صالح",  // code 1
  "رقم قصير جدًا",        // code 2
  "رقم طويل جدًا",        // code 3
  "رقم غير صالح",         // code 4
];

const validateMobileCode = (code: string): string | null => {
  if (!code) return "مفتاح الدولة حقل مطلوب";
  if (!/^\+\d+$/.test(code)) return "مفتاح الدولة غير صالح";
  return null;
};

const validateMobileIso = (iso: string): string | null => {
  if (!iso) return "الرمز الدولي حقل مطلوب";
  if (iso.length !== 2) return "يجب أن يكون الرمز الدولي مكون من حرفين فقط";
  if (!/^[A-Za-z]{2}$/.test(iso))
    return "الرمز الدولي يجب أن يحتوى على أحرف إنجليزية فقط";
  return null;
};

const PhoneInputWithValidation = forwardRef<
  PhoneInputWithValidationRef,
  PhoneInputWithValidationProps
>(({ label, initialValue = "", initOptions }, ref) => {
  const [phoneData, setPhoneData] = useState<PhoneData>({
    phoneNumber: initialValue,
    mobileCode: "",
    mobileIso: "",
    isValid: false,
    errorMessage: "",
  });

  const onNumberChange = (num: string) => {
    setPhoneData((prev) => ({ ...prev, phoneNumber: num }));
  };

  const onValidityChange = (valid: boolean) => {
    setPhoneData((prev) => ({ ...prev, isValid: valid }));
  };

  const onErrorCodeChange = (code: number | null) => {
    let errMsg = "";
    if (code !== null && code !== undefined) {
      errMsg = libraryErrorMap[code] || "تنسيق رقم الجوال غير صالح";
    }
    setPhoneData((prev) => ({ ...prev, errorMessage: errMsg }));
  };

  const onCountryChange = (countryData: any) => {
    const mobileCode = `+${countryData.dialCode}`;
    const mobileIso = countryData.iso2 ? countryData.iso2.toUpperCase() : "";
    const codeErr = validateMobileCode(mobileCode);
    const isoErr = validateMobileIso(mobileIso);
    let errMsg = phoneData.errorMessage;
    if (codeErr) errMsg = codeErr;
    else if (isoErr) errMsg = isoErr;
    setPhoneData((prev) => ({
      ...prev,
      mobileCode,
      mobileIso,
      isValid: prev.isValid && !codeErr && !isoErr,
      errorMessage: errMsg,
    }));
  };

  useImperativeHandle(ref, () => ({
    getPhoneData: () => phoneData,
  }));

  return (
    <div className="flex flex-col justify-start items-start w-full gap-1">
      {label && (
        <label htmlFor="phone-input" className="font-bold text-shadeGray text-sm">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <div
          className={`flex flex-row border ${
            phoneData.errorMessage ? "border-[#FB7185]" : "border-borderColor"
          } rounded-lg h-[40px]`}
        >
          <IntlTelInput
            initialValue={initialValue}
            onChangeNumber={onNumberChange}
            onChangeValidity={onValidityChange}
            onChangeErrorCode={onErrorCodeChange}
            onChangeCountry={onCountryChange}
            initOptions={initOptions as any}
            inputProps={{
              id: "phone-input",
              className:
                "border-none h-[40px] text-left self-center ml-2 w-full focus:outline-none placeholder:text-[#525252] bg-transparent",
            }}
          />
        </div>
        {phoneData.errorMessage && (
          <p className="error-message text-red-500 text-sm">{phoneData.errorMessage}</p>
        )}
      </div>
    </div>
  );
});

export default PhoneInputWithValidation;
