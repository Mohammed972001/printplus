"use client"
import CategorySidebar from "@/components/CategoriesComponents/CategorySidebar";
import ToTopButton from "@/components/SharedComponents/ToTopButton";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SubCategoryGrid from "@/components/CategoriesComponents/SubCategoryGrid";
import { useCategoryData } from "@/hooks/useCategoryData";
import { useBannerImage } from "@/hooks/useBannerImage";
import { useSubCategories } from "@/hooks/useSubCategories";
import BreadcrumbsSkeleton from "@/components/SharedComponents/BreadcrumbsSkeleton";
import BannerSkeleton from "@/components/SharedComponents/BannerSkeleton";
import SidebarSkeleton from "@/components/SharedComponents/SidebarSkeleton";
import ProductsSkeleton from "@/components/SharedComponents/ProductsSkeleton";


const Page = () => {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[2];

  // Fetch active category data
  const {
    activeCategory,
    loading: categoryLoading,
    error: categoryError,
  } = useCategoryData(categoryId);

  // Fetch subcategories for the active category
  const {
    subCategories,
    loading: subCategoriesLoading,
    error: subCategoriesError,
  } = useSubCategories(activeCategory?.categoryId);

  // Fetch banner images
  const {
    bannerImageUrl: mainBannerImageUrl,
    loading: mainBannerLoading,
    error: mainBannerError,
  } = useBannerImage(activeCategory?.categoryMainBannerFileId);

  const {
    bannerImageUrl: mobileBannerImageUrl,
    loading: mobileBannerLoading,
    error: mobileBannerError,
  } = useBannerImage(activeCategory?.categoryMobileBannerFileId);

  // State to track screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle category or banner fetch errors
  if (categoryError || mainBannerError || mobileBannerError) {
    return <div>Error: {categoryError || mainBannerError || mobileBannerError}</div>;
  }

  return (
    <div className="flex flex-col gap-10 px-2 md:gap-6">
      {/* Breadcrumbs */}
      {categoryLoading || mainBannerLoading || mobileBannerLoading ? (
        <BreadcrumbsSkeleton />
      ) : (
        <div className="flex items-center justify-between w-full mt-4 lg:mt-0">
          <div className="px-4 flex items-center gap-2 lg:px-12 lg:pt-6">
            <p className="text-shadeBlack text-sm">Home</p>
            <Image
              src={"/cheveron-right.svg"}
              alt="cheveron"
              width={12}
              height={12}
            />
            <p className="text-shadeGray text-sm flex items-center gap-2">
              {activeCategory ? (
                activeCategory.categoryName
              ) : (
                <span className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              )}
            </p>
          </div>
          <button className="size-12 rounded-lg py-[10px] px-3 cursor-pointer lg:hidden">
            <Image src={"/categories/categorySidebar.svg"} alt="sidebar" width={24} height={24} />
          </button>
        </div>
      )}

      {/* Marketing Banner */}
      {categoryLoading || mainBannerLoading || mobileBannerLoading ? (
        <BannerSkeleton />
      ) : (
        <div className="h-[323px] flex items-center justify-between overflow-hidden">
          <Image
            src={isMobile ? mobileBannerImageUrl || "" : mainBannerImageUrl || ""}
            alt="category banner"
            width={1280}
            height={323}
            className="w-full h-full"
            loading="lazy"
          />
        </div>
      )}

      {/* Main Categories Sidebar and Content */}
      <div className="flex relative px-4 lg:gap-6 lg:mb-16 lg:px-[48.5px] w-full">
        {/* Categories Sidebar */}
        <div className="sticky top-0 self-start">
          {categoryLoading ? <SidebarSkeleton /> : <CategorySidebar />}
        </div>
        {/* Categories Main Page Content */}
        <div className="px-0 flex-1 w-full md:pt-10 md:w-fit md:px-2">
          <div className="flex flex-col gap-10">
            {subCategoriesLoading ? (
              // Show skeleton placeholders while loading
              Array.from({ length: 3 }).map((_, index) => (
                <ProductsSkeleton key={index} />
              ))
            ) : subCategoriesError ? (
              <p className="text-shadeGray text-sm">
                Unable to load subcategories. Please try again later.
              </p>
            ) : subCategories.length > 0 ? (
              subCategories.map((subCategory) => (
                <SubCategoryGrid
                  key={subCategory.subCategoryId}
                  subCategoryName={subCategory.subCategoryName}
                  subCategoryId={subCategory.subCategoryId}
                  categoryId={activeCategory?.categoryId ?? 0}
                  products={subCategory.products}
                />
              ))
            ) : (
              <p className="text-shadeGray text-sm">
                No subcategories available in this category.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Top Button */}
      <div className="hidden md:flex justify-end mb-6">
        <ToTopButton />
      </div>
    </div>
  );
};

export default Page;