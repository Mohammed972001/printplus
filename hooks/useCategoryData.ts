import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Category {
  categoryId: number;
  categoryName: string;
  categoryFileId: number;
  categoryMainBannerFileId: number;
  categoryMobileBannerFileId: number;
}

export const useCategoryData = (categoryId: string | undefined) => {
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveCategory = async () => {
      if (!categoryId) return;

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
        const categories = data.data;

        // Find the active category
        const activeCategory = categories.find(
          (category: { categoryId: number }) =>
            category.categoryId === parseInt(categoryId)
        );

        if (activeCategory) {
          setActiveCategory({
            categoryId: activeCategory.categoryId,
            categoryName: activeCategory.categoryName,
            categoryFileId: activeCategory.categoryFileId,
            categoryMainBannerFileId: activeCategory.categoryMainBannerFileId,
            categoryMobileBannerFileId: activeCategory.categoryMobileBannerFileId,
          });
        } else {
          throw new Error("Category not found");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchActiveCategory();
  }, [categoryId]);

  return { activeCategory, loading, error };
};