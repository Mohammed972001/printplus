import Image from "next/image";
import React from "react";

interface ServiceCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  imageSrc,
  altText,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 px-6">
      <Image
        src={imageSrc}
        alt={altText}
        loading="lazy"
        width={72}
        height={72}
        unoptimized
      />
      <p className="font-medium text-[15px]">{title}</p>
      <p className="text-[13px] text-[#525252] max-w-[228px]">{description}</p>
    </div>
  );
};

export default ServiceCard;
