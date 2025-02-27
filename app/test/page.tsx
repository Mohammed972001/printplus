"use client";
import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CustomButton from "@/components/SharedComponents/CustomButton";
import InputField from "@/components/SharedComponents/InputField";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const DepartmentLookup = () => {
  const { data: session, status } = useSession(); // Get user session
  const [departmentId, setDepartmentId] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [message, setMessage] = useState(""); // API message
  const [error, setError] = useState(""); // Network/auth errors

  const handleSearch = async () => {
    setError(""); // Reset errors
    setMessage(""); // Reset message
    setData([]); // Reset data

    if (!departmentId) {
      toast.error("يرجى إدخال رقم القسم");
      return;
    }

    if (status !== "authenticated" || !session?.user?.token) {
      setError("❌ لا يمكنك البحث بدون تسجيل الدخول. يرجى تسجيل الدخول أولاً.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/my-test/get-name`,
        { departmentId: Number(departmentId) },
        {
          headers: {
            "Accept-Language": "ar-SA",
            Authorization: `Bearer ${session.user.token}`, // Use token from session
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setData(response.data.data);
        setMessage(""); // Clear message when successful
      } else {
        setMessage(response.data.message || "لم يتم العثور على بيانات");
        setData([]); // Ensure table does not appear
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        // If API returns a response with a message, display it instead of an error
        setMessage(err.response.data.message || "لم يتم العثور على بيانات");
      } else {
        setError("حدث خطأ أثناء جلب البيانات. حاول مرة أخرى.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">البحث عن أسماء القسم</h2>

      {/* Input Field */}
      <InputField
        id="departmentId"
        label="رقم القسم"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
      />

      {/* Search Button */}
      <CustomButton label="بحث" className="mt-2" onClick={handleSearch} />

      {/* Show Unauthorized Error */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Show API Message when success: false OR error status 400 */}
      {message && <p className="text-gray-600 mt-4">{message}</p>}

      {/* Data Table */}
      {data.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold">النتائج:</h3>
          <ul className="bg-gray-100 p-2 rounded-md">
            {data.map((item, index) => (
              <li key={index} className="p-1 border-b">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DepartmentLookup;
