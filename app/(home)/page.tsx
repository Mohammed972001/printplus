import BussinessCards from "@/components/HomeComponents/BussinessCards";
import Hero from "@/components/HomeComponents/Hero";
import { MostSold } from "@/components/HomeComponents/MostSold";
import Popular from "@/components/HomeComponents/Popular";
import Services from "@/components/HomeComponents/Services";
import Tail from "@/components/HomeComponents/Tail";

export default function Home() {
  return (
    <>
      <div className="overflow-x-hidden">
      <Hero />
      <Services />
      <Popular />
      <MostSold />
      <BussinessCards />
      <MostSold />
      <Tail />
      </div>
    </>
  );
}
