const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Product = {
  productId: number;
  name: string;
  mainFileId: number;
  firstPrice: number;
  firstQuantity: number;
};

type SubCategory = {
  subCategoryId: number;
  subCategoryName: string;
  subCategoryMainBannerFileId: number;
  subCategoryMobileBannerFileId: number;
  products: Product[];
};

export async function generateMetadata({
  params,
}: {
  params: { id: string; subcategoryId: string };
}) {
  const categoryId = Number(params.id);
  const subCategoryId = Number(params.subcategoryId);

  const response = await fetch(
    `${API_BASE_URL}/categories/get-sub-categories-with-products/${categoryId}`,
    {
      headers: { "Accept-Language": "en-US" },
    }
  );

  const { data }: { data?: SubCategory[] } = await response.json();
  const subCategory = data?.find(
    (sub) => sub.subCategoryId === subCategoryId
  );

  return {
    title: `Print Plus - ${subCategory?.subCategoryName || "Subcategory"}`,
  };
}
