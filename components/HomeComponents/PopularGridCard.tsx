import Image from "next/image";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

interface PopularGridCardProps {
  href: string;
  imageSrc?: string;
  altText?: string;
  label: string;
  isButton?: boolean;
}

const PopularGridCard = ({
  href,
  imageSrc,
  altText,
  label,
  isButton = false,
}: PopularGridCardProps) => {
  return (
    <Link
      href={href}
      className="w-[212px] h-[213px] max-w-[212px] px-[6px] flex flex-col items-center justify-center gap-[16px] cursor-pointer"
    >
      <div className="size-[175px] rounded-[437.5px] bg-[#EDEDED] flex justify-center items-center overflow-hidden shadow-popularShadow">
        {isButton ? (
          <IoMdAdd className="text-2xl" />
        ) : (
          imageSrc && ( // Conditionally render Image only if imageSrc exists
            <Image
              src={imageSrc}
              alt={altText || "Default Image"} // Provide a default alt text
              width={119}
              height={182}
              className="pt-10 w-full"
            />
          )
        )}
      </div>
      <p>{label}</p>
    </Link>
  );
};

export default PopularGridCard;
