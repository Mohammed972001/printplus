const ProductsSkeleton = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-[5.79px]">
            <div className="w-full h-[205px] bg-gray-200 animate-pulse rounded-[3px]"></div>
            <div className="w-3/4 h-4 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded mt-2"></div>
          </div>
        ))}
      </div>
    );
  };

  export default ProductsSkeleton;