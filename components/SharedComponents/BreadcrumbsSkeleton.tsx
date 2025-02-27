const BreadcrumbsSkeleton = () => {
    return (
      <div className="flex items-center justify-between w-full mt-4 md:mt-0">
        <div className="md:pt-6 px-4 flex items-center flex-wrap gap-2 lg:px-12">
          <div className="w-20 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-4 h-4 bg-gray-200 animate-pulse rounded"></div>
          <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div className="size-12 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
    );
  };

  export default BreadcrumbsSkeleton;