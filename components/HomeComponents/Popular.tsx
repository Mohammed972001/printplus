"use client";
import React, { useEffect, useState } from "react";
import PopularGridCard from "./PopularGridCard";
import Loading from "../SharedComponents/Loading";
import ErrorSection from "../SharedComponents/ErrorSection";

interface Category {
  categoryId: number;
  categoryName: string;
  categoryFileId: number;
}

const Popular = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/most-popular`,
          {
            headers: {
              "Accept-Language": "ar-SA", // Set the language header
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        if (data.success) {
          setCategories(data.data); // Set the fetched categories
        } else {
          throw new Error(data.message || "Failed to fetch categories");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    <Loading />; // Show a loading state
  }

  if (error) {
    return <ErrorSection />; // Show an error message
  }

  return (
    <section className="py-[72px] px-[181px] flex justify-center items-center">
      <div className="flex flex-col gap-12 justify-center items-center">
        <h2 className="font-semibold text-2xl text-[#191919]">الأكثر شيوعاً</h2>
        {/* Popular Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <PopularGridCard
              key={category.categoryId}
              href={`/category/${category.categoryId}`} // Example: Link to category details
              imageSrc={`/Popular${category.categoryFileId}.svg`} // Use categoryFileId for dynamic images
              altText={category.categoryName}
              label={category.categoryName}
            />
          ))}
          {/* Add the "See All" button */}
          <PopularGridCard
            href="/categories"
            isButton={true}
            label="شاهد الكل"
          />
        </div>
      </div>
    </section>
  );
};

export default Popular;
