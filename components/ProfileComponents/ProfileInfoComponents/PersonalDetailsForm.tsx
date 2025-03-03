"use client";
import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import "intl-tel-input/styles";

interface UpdatePersonalDetails {
  fullName: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
}

const errorMap = [
  "رقم غير صالح",          
  "رمز الدولة غير صالح",    
  "رقم قصير جدًا",          
  "رقم طويل جدًا",          
  "رقم غير صالح",           
];

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const initialCountry = "sa";

const PersonalDetailsForm = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<UpdatePersonalDetails>({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      mobileNo: "",
      mobileCode: "",
      mobileIso: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const telInputRef = useRef<any>(null);

  const onSubmit = async (data: UpdatePersonalDetails) => {
    try {
      setIsSubmitting(true);
      if (!session?.user?.token) {
        throw new Error("User token is missing. Please log in again.");
      }
      if (!isValidPhone) {
        const errMsg =
          errorCode !== null ? errorMap[errorCode] : "تنسيق رقم الجوال غير صالح";
        throw new Error(errMsg);
      }
      const requestData = {
        ...data,
        mobileNo: phoneNumber,
      };
      await axios.post(`${API_BASE_URL}/users/update-info`, requestData, {
        headers: {
          "Accept-Language": "ar-SA",
          Authorization: `Bearer ${session.user.token}`,
        },
      });
      toast.success("تم تحديث البيانات بنجاح!");
      reset();
    } catch (error: any) {
      toast.error(error.message || "حدث خطأ غير متوقع، حاول مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-lg font-semibold">التفاصيل الشخصية</p>

      <InputField
        id="fullName"
        label="الاسم الكامل"
        {...register("fullName", {
          required: "الاسم الكامل حقل مطلوب",
          pattern: {
            value:
              /^(([A-Za-z\u0621-\u064A]{2,})\s+([A-Za-z\u0621-\u064A]{2,})(\s+([A-Za-z\u0621-\u064A]{2,}))?)$/,
            message:
              "يجب أن يكون الاسم الكامل بالتنسيق 'الاسم الأول الأخير' أو 'الاسم الأول الأوسط الأخير' ويجب أن يحتوي على أحرف صالحة..",
          },
          validate: (value) => {
            const words = value.trim().split(/\s+/);
            if (words.some((w) => w.length < 2)) {
              return "يجب أن تتكون كل كلمة من حرفين على الأقل";
            }
            return true;
          },
        })}
        error={errors.fullName?.message}
      />

      <Controller
        name="mobileNo"
        control={control}
        rules={{
          required: "رقم الجوال حقل مطلوب",
          validate: () => {
            if (!isValidPhone) {
              return errorCode !== null
                ? errorMap[errorCode]
                : "تنسيق رقم الجوال غير صالح";
            }
            return true;
          },
        }}
        render={({ field, fieldState }) => (
          <div className="flex flex-col justify-start items-start w-full gap-1">
            <label htmlFor="phone-input" className="font-bold text-shadeGray text-sm">
              رقم الجوال
            </label>
            <div className="relative w-full">
              <div
                className={`flex flex-row border ${
                  fieldState.error ? "border-[#FB7185]" : "border-borderColor"
                } rounded-lg h-[40px]`}
              >
                <IntlTelInput
                  ref={telInputRef}
                  initialValue={field.value}
                  onChangeNumber={(num: string) => {
                    field.onChange(num);
                    setPhoneNumber(num);
                    if (telInputRef.current) {
                      const instance = telInputRef.current.getInstance();
                      if (instance) {
                        const countryData = instance.getSelectedCountryData();
                        setValue("mobileCode", `+${countryData.dialCode}`);
                        setValue(
                          "mobileIso",
                          countryData.iso2 ? countryData.iso2.toUpperCase() : ""
                        );
                      }
                    }
                  }}
                  onChangeValidity={(valid: boolean) => setIsValidPhone(valid)}
                  onChangeErrorCode={(code: number | null) => setErrorCode(code)}
                  initOptions={{
                    initialCountry: initialCountry,
                    autoInsertDialCode: true,
                    separateDialCode: false,
                    nationalMode: false,
                    autoHideDialCode: false,
                    formatOnDisplay: true,
                    validationNumberType: ["MOBILE", "FIXED_LINE_OR_MOBILE"],
                    utilsScript:
                      "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
                  } as any}
                  inputProps={{
                    id: "phone-input",
                    className:
                      "border-none h-[40px] text-left self-center ml-2 w-full focus:outline-none placeholder:text-[#525252] bg-transparent",
                  }}
                />
              </div>
              {fieldState.error && (
                <p className="error-message text-red-500 text-sm">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          </div>
        )}
      />

      <input
        type="hidden"
        {...register("mobileCode", {
          required: "مفتاح الدولة حقل مطلوب",
          pattern: {
            value: /^\+\d+$/,
            message: "مفتاح الدولة غير صالح",
          },
        })}
      />
      <input
        type="hidden"
        {...register("mobileIso", {
          required: "الرمز الدولي حقل مطلوب",
          validate: {
            length: (value) =>
              value.length === 2 || "يجب أن يكون الرمز الدولي مكون من حرفين فقط",
            letters: (value) =>
              /^[A-Za-z]{2}$/.test(value) ||
              "الرمز الدولي يجب أن يحتوى على أحرف إنجليزية فقط",
          },
        })}
      />

      <CustomButton
        label={isSubmitting ? "Saving..." : "Save"}
        className="md:!h-[32px] md:!w-[113px]"
        type="submit"
        disabled={!isValid || !isValidPhone || isSubmitting}
      />
    </form>
  );
};

export default PersonalDetailsForm;
