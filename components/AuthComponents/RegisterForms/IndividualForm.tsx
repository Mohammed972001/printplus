"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import { useRouter } from "next/navigation";

interface IndvidualRegisterFormData {
  fullName: string;
  email: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
  cityId: number;
  password: string;
  accountType: number;
  confirmPassword?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultValues = {
  fullName: "",
  email: "",
  mobileNo: "",
  mobileCode: "",
  mobileIso: "",
  password: "",
  cityId: 2,
  accountType: 1,
};

const commonPasswords = ["password", "123456", "12345678", "qwerty", "abc123"];

const isCommonPassword = (password: string) => {
  return commonPasswords.includes(password.toLowerCase());
};

const IndividualForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<IndvidualRegisterFormData>({ defaultValues, mode: "onChange" });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [mobileNo, setMobileNo] = useState(defaultValues.mobileNo);
  const [mobileCode, setMobileCode] = useState(defaultValues.mobileCode);
  const [mobileIso, setMobileIso] = useState(defaultValues.mobileIso);

  const handlePhoneChange = (phone: string, country: any) => {
    setMobileNo(phone);
    setMobileCode(`+${country.dialCode}`);
    setMobileIso(country.countryCode.toUpperCase());
  };

  const onSubmit = async (data: IndvidualRegisterFormData) => {
    if (!mobileCode) {
      toast.error("مفتاح الدولة حقل مطلوب");
      return;
    }
    if (!/^\+\d+$/.test(mobileCode)) {
      toast.error("مفتاح الدولة غير صالح");
      return;
    }
    if (!mobileNo) {
      toast.error("رقم الجوال حقل مطلوب");
      return;
    }
    if (!/^\d{6,15}$/.test(mobileNo)) {
      toast.error("تنسيق رقم الجوال غير صالح");
      return;
    }
    if (!mobileIso) {
      toast.error("الرمز الدولي حقل مطلوب");
      return;
    }
    if (!/^[A-Za-z]{2}$/.test(mobileIso)) {
      toast.error("يجب أن يكون الرمز الدولي مكون من حرفين فقط");
      return;
    }
    if (!data.cityId) {
      toast.error("المدينة حقل مطلوب");
      return;
    }
    if (data.accountType !== 1) {
      toast.error("نوع الحساب يجب أن يكون شخصي");
      return;
    }

    try {
      setLoading(true);
      const { confirmPassword, ...requestData } = {
        ...data,
        mobileNo,
        mobileCode,
        mobileIso,
      };

      const response = await axios.post(`${API_BASE_URL}/auth/register`, requestData);
      toast.success("تم التسجيل بنجاح تفقد بريدك الالكتروني!");
      reset();
      router.push("login");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data?.message || "حدث خطأ، حاول مرة أخرى");
      } else if (error.request) {
        toast.error("لم يتم استلام استجابة من السيرفر، تحقق من اتصالك بالإنترنت.");
      } else {
        toast.error("حدث خطأ غير متوقع، حاول مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-6 w-full md:w-[485px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6 w-full">
        <InputField
          id="fullName"
          label="Full name*"
          {...register("fullName", {
            required: "الاسم الكامل حقل مطلوب.",
            validate: (value) => {
              const words = value.trim().split(/\s+/);
              if (!(words.length === 2 || words.length === 3)) {
                return 'يجب أن يكون الاسم الكامل بالتنسيق "الاسم الأول الأخير" أو "الاسم الأول الأوسط الأخير" ويجب أن يحتوي على أحرف صالحة.';
              }
              for (let word of words) {
                if (word.length < 2) return "يجب أن تتكون كل كلمة في الاسم الكامل من حرفين على الأقل";
                if (!/^[A-Za-z\u0600-\u06FF]+$/.test(word)) {
                  return 'يجب أن يكون الاسم الكامل بالتنسيق "الاسم الأول الأخير" أو "الاسم الأول الأوسط الأخير" ويجب أن يحتوي على أحرف صالحة.';
                }
              }
              return true;
            },
          })}
          error={errors.fullName?.message}
        />
        <InputField
          id="email"
          label="Email*"
          {...register("email", {
            required: "البريد الإلكتروني حقل مطلوب",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "البريد الإلكتروني غير صحيح",
            },
          })}
          error={errors.email?.message}
        />
        <InputField
          id="mobileNo"
          isPhoneInput={true}
          label="Mobile Number*"
          value={mobileNo}
          onPhoneChange={handlePhoneChange}
        />
        <InputField
          id="password"
          label="Password*"
          type="password"
          {...register("password", {
            required: "كلمة المرور حقل مطلوب",
            minLength: { value: 8, message: "كلمة المرور يجب أن تكون على الأقل 8" },
            maxLength: { value: 64, message: "كلمة المرور يجب ألا تتجاوز 64" },
            validate: {
              hasUppercase: (value) =>
                /[A-Z]/.test(value) || "كلمة المرور يجب أن تحتوي على الأقل حرف كبير واحد",
              hasLowercase: (value) =>
                /[a-z]/.test(value) || "كلمة المرور يجب أن تحتوي على ألاقل حرف صغير واحد",
              hasDigit: (value) =>
                /\d/.test(value) || "كلمة المرور يجب أن تحتوى على الأقل حرقم واحد",
              hasSpecial: (value) =>
                /[!@#$%^&*(),.?":{}|<>]/.test(value) || "كلمة المرور يجب أن تحتوي على الأقل رمز خاص واحد",
              noWhitespace: (value) =>
                !/\s/.test(value) || "كلمة المرور يجب ألا تحتوي على فراغات",
              notCommon: (value) =>
                !isCommonPassword(value) || "تعتبر شائعة وسهلة التخمين",
            },
          })}
          error={errors.password?.message}
        />
        <InputField
          id="confirmpassword"
          label="Confirm Password*"
          type="password"
          {...register("confirmPassword", {
            required: "هذا الحقل مطلوب",
            validate: (value) => value === watch("password") || "كلمة المرور غير متطابقة",
          })}
          error={errors.confirmPassword?.message}
        />
      </div>
      <CustomButton
        label={loading ? "Signing up..." : "Sign up"}
        type="submit"
        className="mt-6"
        disabled={!isValid || loading}
      />
    </form>
  );
};

export default IndividualForm;
