import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
  subCategoryMainBannerFileId: number;
  subCategoryMobileBannerFileId: number; // Add this property
  categoryName: string;
}

export const useSubCategoryData = (
  categoryId: string | undefined,
  subCategoryId: string | undefined
) => {
  const [subCategory, setSubCategory] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubCategory = async () => {
      if (!categoryId || !subCategoryId) return;

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
          throw new Error("Failed to fetch subcategory data");
        }

        const data = await response.json();
        const categories = data.data;

        // Find the subcategory in the categories
        let foundSubCategory: SubCategory | null = null;
        for (const category of categories) {
          const subCategory = category.subCategories.find(
            (sub: { subCategoryId: number }) =>
              sub.subCategoryId === parseInt(subCategoryId)
          );
          if (subCategory) {
            foundSubCategory = {
              ...subCategory,
              categoryName: category.categoryName,
            };
            break;
          }
        }

        if (foundSubCategory) {
          setSubCategory(foundSubCategory);
        } else {
          throw new Error("Subcategory not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategory();
  }, [categoryId, subCategoryId]);

  return { subCategory, loading, error };
};