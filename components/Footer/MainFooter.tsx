import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const MainFooter = () => {
  return (
    <footer className="flex flex-col justify-start items-center px-12 pt-12 pb-6 bg-[#F8FAFC] gap-1 w-full text-shadeBlack">
      <hr />
      {/* Main footer Content */}
      <div className="w-full flex justify-start items-start 2xl:justify-center">
        {/* Footer Grid */}
        <div className="flex flex-col justify-start items-start gap-10  w-full lg:flex-row lg:gap-[132px] lg:max-w-[960px] xl:max-w-[1061px] 2xl:max-w-[1440px]">
          {/* Logo Section Content */}
          <div className="flex flex-col gap-[11px]">
            {/* Logo div */}
            <Link href={"/"}>
              <Image src={"/logo.svg"} alt="logo" width={84} height={50} />
            </Link>
            {/* Footer logo section card */}
            <p className="text-[15px] max-w-[280px]">
              Al-Sadhan Center, Mousa Bin Nasser Street, Al-Sulaimaniya
              District, Riyadh.
            </p>
            <div className="flex flex-col gap-1 font-medium text-black text-[13px]">
              <p>+966 59 913 9318</p>
              <p>support@print.sa</p>
            </div>
          </div>
          {/* Links and Sponsers Section */}
          <div className="flex flex-col justify-between items-start flex-1 lg:flex-row">
            {/* Help Section Content large screen */}
            <div className="hidden lg:flex flex-col gap-4">
              <p className="font-semibold">Help</p>
              <div className="flex flex-col gap-1">
                <Link href={"/"}>Track order</Link>
                <Link href={"/"}>Shipping</Link>
                <Link href={"/"}>Returns</Link>
              </div>
            </div>
            {/* About us Section Content large screen */}
            <div className="hidden lg:flex flex-col gap-4">
              <p className="font-semibold">About us</p>
              <div className="flex flex-col gap-1">
                <Link href={"/"}>About Us</Link>
                <Link href={"/"}>FAQs</Link>
                <Link href={"/"}>Contact Us</Link>
              </div>
            </div>
            {/* Help and About us Small screen */}
            <div className="flex lg:hidden items-start gap-[84px] mb-6">
              <div className="flex flex-col gap-4 text-nowrap">
                <p className="font-semibold">Help</p>
                <div className="flex flex-col gap-1">
                  <Link href={"/"}>Track order</Link>
                  <Link href={"/"}>Shipping</Link>
                  <Link href={"/"}>Returns</Link>
                </div>
              </div>
              <div className="flex flex-col gap-4 text-nowrap">
                <p className="font-semibold">About us</p>
                <div className="flex flex-col gap-1">
                  <Link href={"/"}>About Us</Link>
                  <Link href={"/"}>FAQs</Link>
                  <Link href={"/"}>Contact Us</Link>
                </div>
              </div>
            </div>
            {/* Sponsers and Social Links Section */}
            <div className="flex flex-col gap-6">
              <Image src={"/Footer6.svg"} alt="vat" width={42} height={50} />
              <div className="flex items-center gap-2">
                <Image
                  src={"/Footer3.svg"}
                  alt="mastercard"
                  width={35}
                  height={27.23}
                />
                <Image
                  src={"/Footer2.svg"}
                  alt="visa"
                  width={41.61}
                  height={13.44}
                />
                <Image
                  src={"/Footer1.svg"}
                  alt="mada"
                  width={43.3}
                  height={14.44}
                />
                <Image
                  src={"/Footer5.svg"}
                  alt="aramex"
                  width={69.3}
                  height={11.26}
                />
                <Image
                  src={"/Footer4.svg"}
                  alt="icon"
                  width={27.25}
                  height={27.25}
                />
              </div>
              <div className="flex items-center gap-[14.28px]">
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC]">
                  <FaFacebookF className="w-[9.4px] h-[15.04px]" />
                </button>
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC]">
                  <FaXTwitter className="w-[18.3px] h-[18.29px]" />
                </button>
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC]">
                  <FaInstagram className="w-[16.07px] h-[16.07px]" />
                </button>
                <button className="rounded-[35.71px] size-[39.28px] p-[8.93px] flex justify-center items-center border-[0.89px] border-[#CBD5E1] bg-[#F8FAFC]">
                  <FaYoutube className="w-[17.58px] h-[17.58px]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Tail */}
      <div className="flex flex-col pt-3 gap-8 w-full 2xl:max-w-[1440px] text-nowrap">
        <hr className="w-full" />
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <p className="text-sm order-2 lg:order-1">© 2025 print plus</p>
          <div className="flex items-center gap-4 mb-8 order-1 lg:order-2 lg:mb-0">
            <button className="underline text-sm">Privacy Policy</button>
            <button className="underline text-sm">Terms & Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
