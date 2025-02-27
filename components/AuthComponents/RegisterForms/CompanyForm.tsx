"use client";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";
import { useRouter } from "next/navigation";
import SelectField from "@/components/SharedComponents/SelectField";

interface City {
  value: number;
  text: string;
}

interface CompanyRegisterFormData {
  fullName: string;
  email: string;
  mobileNo: string;
  mobileCode: string;
  mobileIso: string;
  cityId: number;
  password: string;
  accountType: number;
  confirmPassword?: string;
  companyName: string;
  vatNumber: string;
  vatAddress: string;
  vatName: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultValues: CompanyRegisterFormData = {
  fullName: "",
  email: "",
  mobileNo: "",
  mobileCode: "",
  mobileIso: "",
  password: "",
  cityId: 2,
  accountType: 2,
  companyName: "",
  vatNumber: "",
  vatAddress: "",
  vatName: "",
};

const CompanyForm = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const router = useRouter();
  const [mobileNo, setMobileNo] = useState(defaultValues.mobileNo);
  const [mobileCode, setMobileCode] = useState(defaultValues.mobileCode);
  const [mobileIso, setMobileIso] = useState(defaultValues.mobileIso);

  const handlePhoneChange = (phone: string, country: any) => {
    setMobileNo(phone);
    setMobileCode(`+${country.dialCode}`);
    setMobileIso(country.countryCode.toUpperCase());
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<CompanyRegisterFormData>({ defaultValues, mode: "onChange" });

  const companyName = watch("companyName");

  // بنحدث قيمة الـ fullName بحيث تبقى زي companyName
  useEffect(() => {
    setValue("fullName", companyName);
  }, [companyName, setValue]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cities/1`, {
          headers: { "Accept-Language": "ar-SA" },
        });
        if (response.data.success) {
          setCities(response.data.data);
          reset({ cityId: response.data.data[0]?.value });
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
        toast.error("فشل تحميل المدن، حاول مرة أخرى.");
      }
    };
    fetchCities();
  }, [setValue, reset]);

  const onSubmit = async (data: CompanyRegisterFormData) => {
    // التحقق من بيانات الموبايل يدويًا
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
    if (mobileIso.length !== 2) {
      toast.error("يجب أن يكون الرمز الدولي مكون من حرفين فقط");
      return;
    }
    if (!/^[A-Za-z]{2}$/.test(mobileIso)) {
      toast.error("الرمز الدولي يجب أن يحتوى على أحرف إنجليزية فقط");
      return;
    }
    if (!data.cityId) {
      toast.error("المدينة حقل مطلوب");
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
      await axios.post(`${API_BASE_URL}/auth/register`, requestData);
      toast.success("تم التسجيل بنجاح تفقد بريدك الالكتروني!");
      reset();
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "حدث خطأ، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 mx-4 lg:mx-[79px] w-full justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row items-start gap-6 md:gap-[50px] lg:gap-[132px] w-full">
        <div className="flex flex-col gap-6 w-full">
          <InputField
            id="companyName"
            label="Full name*"
            {...register("companyName", {
              required: "الاسم الكامل حقل مطلوب.",
              validate: (value) => {
                const words = value.trim().split(/\s+/);
                if (!(words.length === 2 || words.length === 3)) {
                  return 'يجب أن يكون الاسم الكامل بالتنسيق "الاسم الأول الأخير" أو "الاسم الأول الأوسط الأخير" ويجب أن يحتوي على أحرف صالحة..';
                }
                for (let word of words) {
                  if (word.length < 2)
                    return "يجب أن تتكون كل كلمة في الاسم الكامل من حرفين على الأقل";
                  if (!/^[A-Za-z\u0600-\u06FF]+$/.test(word)) {
                    return 'يجب أن يكون الاسم الكامل بالتنسيق "الاسم الأول الأخير" أو "الاسم الأول الأوسط الأخير" ويجب أن يحتوي على أحرف صالحة..';
                  }
                }
                return true;
              },
            })}
            error={errors.companyName?.message}
          />
          <InputField
            id="email"
            label="Email*"
            {...register("email", {
              required: "البريد الإلكتروني حقل مطلوب",
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
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
            // لو عندك حاجة للخطأ، ممكن تضيف هنا error={/* لو حابب تعرض خطأ للموبايل */} 
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
                hasUpperCase: (value) =>
                  /[A-Z]/.test(value) || "كلمة المرور يجب أن تحتوي على الأقل حرف كبير واحد",
                hasLowerCase: (value) =>
                  /[a-z]/.test(value) || "كلمة المرور يجب أن تحتوي على ألاقل حرف صغير واحد",
                hasDigit: (value) =>
                  /\d/.test(value) || "كلمة المرور يجب أن تحتوى على الأقل حرقم واحد",
                hasSpecialChar: (value) =>
                  /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                  "كلمة المرور يجب أن تحتوي على الأقل رمز خاص واحد",
                noWhiteSpace: (value) =>
                  !/\s/.test(value) || "كلمة المرور يجب ألا تحتوي على فراغات",
                notCommon: (value) =>
                  !["password", "123456", "12345678", "qwerty", "abc123"].includes(
                    value.toLowerCase()
                  ) || "تعتبر شائعة وسهلة التخمين",
              },
            })}
            error={errors.password?.message}
          />
          <InputField
            id="confirmPassword"
            label="Confirm Password*"
            type="password"
            {...register("confirmPassword", {
              required: "هذا الحقل مطلوب",
              validate: (value) =>
                value === watch("password") || "كلمة المرور غير متطابقة",
            })}
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <SelectField
            id="cityId"
            label="City*"
            options={cities}
            register={register("cityId", { required: "المدينة حقل مطلوب" })}
            error={errors.cityId?.message}
          />
          <InputField
            id="vatNumber"
            label="Tax Number*"
            {...register("vatNumber", { required: "هذا الحقل مطلوب" })}
            error={errors.vatNumber?.message}
          />
          <InputField
            id="vatName"
            label="Tax Name*"
            {...register("vatName", { required: "هذا الحقل مطلوب" })}
            error={errors.vatName?.message}
          />
          <InputField
            id="vatAddress"
            label="Tax Address*"
            {...register("vatAddress", { required: "هذا الحقل مطلوب" })}
            error={errors.vatAddress?.message}
          />
        </div>
      </div>
      <div className="w-full">
        <CustomButton
          label={loading ? "Signing up..." : "Sign up"}
          type="submit"
          className="mt-6"
          disabled={!isValid || loading}
        />
      </div>
    </form>
  );
};

export default CompanyForm;
