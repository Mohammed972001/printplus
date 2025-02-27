import Image from "next/image";
import React from "react";

const SearchBar = () => {
  return (
    <div className="relative w-full h-12 border border-[#CBD5E1] rounded-[28px] flex justify-start items-center">
      <div className="absolute top-3 left-[10px] flex items-center gap-2 w-[95%]">
      <Image src={"/search.svg"} alt="search" width={20} height={20}/>
      <input type="text" placeholder="Search" className="w-full outline-none"/>
      </div>
    </div>
  );
};

export default SearchBar;
