import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#390089",
        secondary: "#D9488F",
        shadeBlack: "#0F172A",
        shadeGray : "#475569",
        borderColor: "#94A3B8",
        cardBorder: "#E2E8F0",
        categoryLink: "#334155",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        heroBg2: "url('/herobg.png')",
        bussinessBg2: "url('/BussinessCardsBg.png')",
        tailBg: "url('/TailBg.png')",
      },
      boxShadow: {
        popularShadow:
          "-0.88px 0.88px 2.63px 0px #0000001A, " +
          "-3.5px 4.38px 5.25px 0px #00000017, " +
          "-7px 10.5px 7.88px 0px #0000000D, " +
          "-13.13px 18.38px 8.75px 0px #00000003, " +
          "-20.13px 28px 9.63px 0px #00000000",
      },
    },
  },
  plugins: [],
} satisfies Config;
