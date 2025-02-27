"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface ProfileAddressDetails {
  addressLine1: string;
  addressLine2: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const AddressDetails = () => {
  const { data: session, status } = useSession(); // Get the session and its status
  const [address, setAddress] = useState<ProfileAddressDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch data if the user is authenticated, the token is available, and address is not already set
    if (
      status === "authenticated" &&
      session?.user?.token &&
      address.length === 0
    ) {
      const fetchAddress = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`${API_BASE_URL}/addresses`, {
            headers: {
              "Accept-Language": "ar-SA",
              Authorization: `Bearer ${session.user.token}`,
            },
          });
          if (response.data.success) {
            setAddress(response.data.data);
          }
        } catch (error) {
          console.error("Failed to fetch Address:", error);
          toast.error("فشل في تحميل العنوان.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchAddress();
    }
  }, [session?.user?.token, status, address.length]);

  // Get the first address in the array
  const firstAddress = address[0];

  return (
    <div className="flex justify-between items-start">
      <div className="flex flex-col gap-4">
        <p className="text-lg font-semibold">Address</p>
        {isLoading ? (
          <p>Loading...</p>
        ) : firstAddress ? (
          <p>
            {firstAddress?.addressLine1}, {firstAddress?.addressLine2}
          </p>
        ) : (
          <p>No address found.</p>
        )}
      </div>
      <Link
        href={"/profile/info/address"}
        className="text-sm text-[#475569] font-semibold"
      >
        Edit
      </Link>
    </div>
  );
};

export default AddressDetails;
