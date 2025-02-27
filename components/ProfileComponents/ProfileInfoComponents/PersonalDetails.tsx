"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProfilePersonalDetails {
  fullName: string;
  email: string;
  mobileNo: string;
  mobileCode: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const PersonalDetails = () => {
  const { data: session, status } = useSession(); // Get the session and its status
  const [personalDetails, setPersonalDetails] = useState<ProfilePersonalDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch data if the user is authenticated, the token is available, and personalDetails is not already set
    if (status === "authenticated" && session?.user?.token && !personalDetails) {
      const fetchPersonalDetails = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/users/get`, {
            headers: {
              "Accept-Language": "ar-SA",
              Authorization: `Bearer ${session.user.token}`,
            },
          });
          if (response.data.success) {
            setPersonalDetails(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch Personal Details:", error);
          toast.error("فشل في تحميل البيانات الشخصية.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchPersonalDetails();
    }
  }, [session?.user?.token, status]);

  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-lg">Personal details</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col">
            <p>{personalDetails?.fullName},</p>
            <p>{personalDetails?.email}</p>
            <p>
              {personalDetails?.mobileCode} {personalDetails?.mobileNo}
            </p>
          </div>
        )}
      </div>
      <Link
        href={"/profile/info/personaldetails"}
        className="text-sm text-[#475569] font-semibold"
      >
        Edit
      </Link>
    </div>
  );
};

export default PersonalDetails;