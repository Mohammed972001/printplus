"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { usePathname } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define types for the API response
interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
  subCategoryMainBannerFileId: number;
  subCategoryMobileBannerFileId: number;
}

interface Category {
  categoryId: number;
  categoryName: string;
  categoryFileId: number;
  categoryMainBannerFileId: number;
  categoryMobileBannerFileId: number;
  subCategories: SubCategory[];
}

// Define the type for the expandedCategories state
type ExpandedCategories = {
  [key: string]: boolean;
};

const CategorySidebar = () => {
  const [expandedCategories, setExpandedCategories] =
    useState<ExpandedCategories>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname(); // Get the current pathname

  // Fetch categories and subcategories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/get-categories-with-sub-categories`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": "en-US",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Automatically expand the category if its link is active
  useEffect(() => {
    if (pathname) {
      const activeCategory = categories.find((category) =>
        pathname.startsWith(`/category/${category.categoryId}`)
      );

      if (activeCategory) {
        setExpandedCategories((prev) => ({
          ...prev,
          [activeCategory.categoryName]: true,
        }));
      }
    }
  }, [pathname, categories]);

  // Toggle the expanded state for a category
  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="hidden w-[243px] pt-10 lg:flex flex-col gap-4">
      <p className="text-shadeBlack font-semibold text-[30px]">Products</p>
      <div className="flex flex-col">
        {categories.map((category) => (
          <div key={category.categoryId} className="border-b border-[#E7E6E6]">
            <div className="w-full py-2 flex items-center justify-between">
              <Link
                href={`/category/${category.categoryId}`} // Link to the category page
                className={`text-categoryLink font-medium text-[15px] flex-1 ${
                  pathname === `/category/${category.categoryId}`
                    ? "text-shadeBlack font-bold"
                    : ""
                }`}
              >
                {category.categoryName}
              </Link>
              {category.subCategories.length > 0 && (
                <button
                  onClick={() => toggleCategory(category.categoryName)}
                  className="p-2"
                >
                  {expandedCategories[category.categoryName] ? (
                    <FaChevronUp size={12} />
                  ) : (
                    <FaChevronDown size={12} />
                  )}
                </button>
              )}
            </div>
            {/* Sub-items with transition */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: expandedCategories[category.categoryName]
                  ? `${category.subCategories.length * 24}px` // Adjust based on item height
                  : "0px",
              }}
            >
              <div className="flex flex-col gap-[3px] pl-4 pb-2">
                {category.subCategories.map((subCategory) => (
                  <Link
                    href={`/category/${category.categoryId}/${subCategory.subCategoryId}`} // Link to the subcategory page
                    key={subCategory.subCategoryId}
                    className={`text-categoryLink text-[13px] hover:text-shadeBlack ${
                      pathname ===
                      `/category/${category.categoryId}/${subCategory.subCategoryId}`
                        ? "text-shadeBlack font-bold"
                        : ""
                    }`}
                  >
                    {subCategory.subCategoryName}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;
