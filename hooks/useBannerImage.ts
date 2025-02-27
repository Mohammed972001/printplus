import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useBannerImage = (fileId: number | undefined) => {
  const [bannerImageUrl, setBannerImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerImage = async () => {
      if (!fileId) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/files/get-file?id=${fileId}`,
          {
            headers: {
              accept: "*/*",
              "Accept-Language": "en-US",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch banner image");
        }

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setBannerImageUrl(imageUrl);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchBannerImage();
  }, [fileId]);

  return { bannerImageUrl, loading, error };
};
