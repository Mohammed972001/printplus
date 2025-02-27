"use client";
import React, { useEffect, useState } from "react";
import MostSoldCard from "./MostSoldCard";
import Loading from "../SharedComponents/Loading";
import ErrorSection from "../SharedComponents/ErrorSection";

interface MostSoldItem {
  productId: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  subCategoryId: number;
  weight: number;
  size: number;
  categoryId: number;
  mainFileId: number;
  firstPrice: number;
  firstQuantity: number;
  imageUrl?: string; // Add imageUrl to the interface
}

export const MostSold = () => {
  const [mostSold, setMostSold] = useState<MostSoldItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Function to fetch image URL for a product
  const fetchImageUrl = async (fileId: number) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/files/get-product-file?id=${fileId}&type=1`,
        {
          headers: {
            "Accept-Language": "ar-SA",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }

      // Assuming the API returns the image URL directly
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (err) {
      console.error("Error fetching image:", err);
      return null;
    }
  };

  // Fetch most sold products
  useEffect(() => {
    const fetchMostSold = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products/get-top-sale`, {
          headers: {
            "Accept-Language": "ar-SA",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch most sold products");
        }

        const data = await response.json();
        if (data.success) {
          const products = data.data.items;

          // Fetch image URLs for each product
          const productsWithImages = await Promise.all(
            products.map(async (product: MostSoldItem) => {
              const imageUrl = await fetchImageUrl(product.mainFileId);
              return { ...product, imageUrl };
            })
          );

          setMostSold(productsWithImages); // Set the fetched products with image URLs
        } else {
          throw new Error(data.message || "Failed to fetch most sold products");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchMostSold();
  }, []);

  if (loading) {
    return <Loading />; // Show a loading state
  }

  if (error) {
    return <ErrorSection />; // Show an error message
  }

  return (
    <section className="flex justify-center items-center gap-20 py-[72px] px-[181px]">
      <div className="flex flex-col gap-12 justify-center items-center">
        <h2 className="font-semibold text-2xl text-[#191919]">
          المنتجات الأكثر مبيعًا
        </h2>
        {/* Most Sold Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mostSold.map((item) => (
            <MostSoldCard
              key={item.productId}
              imageSrc={item.imageUrl || "/default-image.svg"} // Use a default image if imageUrl is not available
              altText={item.nameAr}
              title={item.nameAr}
              price={item.firstPrice.toString()}
              quantity={`${item.firstQuantity} قطعة`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
