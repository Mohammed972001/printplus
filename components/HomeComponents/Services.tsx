import React from "react";
import ServiceCard from "./ServiceCard";
import servicesData from "@/constants/serviceData/servicesData";

const Services = () => {
  return (
    <section className="flex justify-center items-center py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Service card displaying 4 cards with gif images and data */}
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            imageSrc={service.imageSrc}
            altText={service.altText}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
