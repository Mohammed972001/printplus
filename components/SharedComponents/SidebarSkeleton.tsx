const SidebarSkeleton = () => {
    return (
      <div className="sticky top-0 self-start w-[243px] pt-10 hidden md:flex">
        <div className="w-full h-8 bg-gray-200 animate-pulse rounded"></div>
        <div className="flex flex-col gap-2 mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-full h-6 bg-gray-200 animate-pulse rounded"></div>
          ))}
        </div>
      </div>
    );
  };

  export default SidebarSkeleton;