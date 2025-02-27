import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SubCategory {
  subCategoryId: number;
  subCategoryName: string;
  products: {
    productId: number;
    name: string;
    mainFileId: number;
    firstPrice: number;
    firstQuantity: number;
  }[];
}

export const useSubCategories = (categoryId: number | undefined) => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!categoryId) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/categories/get-sub-categories-with-products/${categoryId}`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": "en-US",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subcategories");
        }

        const data = await response.json();
        setSubCategories(data.data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchSubCategories();
  }, [categoryId]);

  return { subCategories, loading, error };
};