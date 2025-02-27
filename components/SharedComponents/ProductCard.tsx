"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ProductCardProps {
  mainFileId: number; // Pass the mainFileId instead of imgSrc
  alt: string;
  newBadge?: boolean;
  saleBadge?: boolean;
  title: string;
  price: string;
  saleAmount?: string;
}

const ProductCard = ({
  mainFileId,
  alt,
  newBadge,
  saleBadge,
  title,
  price,
  saleAmount,
}: ProductCardProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Fetch the product thumbnail image
  useEffect(() => {
    const fetchProductImage = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/files/get-product-file?id=${mainFileId}&type=2`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": "en-US",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch product image");
        }

        // Get the image URL from the response
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching product image:", error);
      }
    };

    fetchProductImage();
  }, [mainFileId]);

  return (
    <div className="flex flex-col gap-[5.79px]">
      <div className="relative w-full">
        {/* Product Image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={alt}
            width={213}
            height={205}
            className="rounded-[3px] w-full h-[205px]"
          />
        ) : (
          <div className="w-full h-[205px] bg-gray-200 animate-pulse rounded-[3px]"></div>
        )}
        {/* Conditional new badge render */}
        {newBadge && (
          <div className="absolute bottom-[5.9px] left-[6.24px] bg-[#0F172A] rounded-[20px] px-2 h-[24px] text-white text-xs font-semibold flex justify-center items-center">
            <p>New</p>
          </div>
        )}
        {/* Conditional sale badge render */}
        {saleBadge && (
          <div className="absolute bottom-[5.9px] left-[6.24px] bg-[#BE123C] rounded-[20px] px-2 h-[24px] text-white text-xs font-semibold flex justify-center items-center">
            <p>{saleAmount}</p>
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-semibold text-black text-sm">{title}</p>
        <p className="text-sm">
          starts from{" "}
          <span className="font-semibold text-[#6366F1]">{price}</span> SAR
        </p>
      </div>
    </div>
  );
};

export default ProductCard;