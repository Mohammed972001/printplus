const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Category = {
  categoryId: number;
  categoryName: string;
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const categoryId = Number(params.id);

  const response = await fetch(`${API_BASE_URL}/categories/get-categories`, {
    headers: { "Accept-Language": "en-US" },
  });

  const { data }: { data?: Category[] } = await response.json();
  const category = data?.find((cat) => cat.categoryId === categoryId);

  return { title: `Print Plus - ${category?.categoryName || "Category"}` };
}
