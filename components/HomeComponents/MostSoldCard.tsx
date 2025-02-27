import Image from "next/image";

interface MostSoldCardProps {
  imageSrc: string;
  altText: string;
  title: string;
  price: string;
  quantity: string;
}

const MostSoldCard: React.FC<MostSoldCardProps> = ({
  imageSrc,
  altText,
  title,
  price,
  quantity,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Card Image div */}
      <div className="w-fit h-fit rounded-[2.56px] flex justify-center items-center">
        <Image
          src={imageSrc}
          alt={altText}
          width={296}
          height={296}
          loading="lazy"
          className="max-h-[182px]"
        />
      </div>
      {/* Card text div */}
      <div className="flex flex-col justify-start items-start gap-2">
        <h3 className="text-[17.66px] font-medium text-[#191919]">{title}</h3>
        <p className="font-sm text-[#525252]">يبدأ من</p>
        <div className="flex items-center gap-1 text-[#390089]">
          <p>{price} ريال /</p>
          <p>{quantity}</p>
        </div>
      </div>
    </div>
  );
};

export default MostSoldCard;