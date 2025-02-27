const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/categories/get-categories`,
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
      return data.data; // Return the array of categories
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };