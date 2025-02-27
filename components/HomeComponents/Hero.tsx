import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div
      className="w-full h-[500px] bg-heroBg2 bg-no-repeat bg-cover flex items-center relative"
      style={{
        backgroundPosition: "-281px -29px", // Move the background image to the left
        backgroundColor: "black", // Add black background color to fill the right space
      }}
    >
      {/* Ellipse */}
      <div className="absolute w-[700px] h-[700px] bg-[#d9d9d94a] blur-[218.7px] top-0 -right-[435px]"/>
      {/* Left Section */}
      <div className="px-11 py-9 flex flex-col gap-6 ms-[119px]">
        {/* Text Section */}
        <div className="w-[505px]">
          <h1 className="text-white font-medium text-[32px]">بطاقات الأعمال</h1>
          <p className="text-white text-xl font-light">
            بطاقات أعمال مميزة بتصاميم فريدة، تفاصيل فاخرة، وانطباعات تدوم،كل
            بطاقة تحكي قصة تميزك وتعبّر عن علامتك بأسلوب استثنائي!
          </p>
        </div>
        {/* Work Card Span */}
        <Link
          href={"/"}
          className="bg-white w-fit h-[46px] px-[31px] py-[1px] rounded-[3px] flex items-center justify-center "
        >
          <p className="text-[15px] font-medium text-nowrap">
            تسوق بطاقات العمل
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
