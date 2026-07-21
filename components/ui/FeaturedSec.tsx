import React from "react";

import { Londrina_Solid } from "next/font/google";

const londrina = Londrina_Solid({
  weight: ["400"], // Regular weight
  subsets: ["latin"],
  display: "swap", // Recommended for better performance
});

const FeaturedSec = () => {
  return (
    <section>
      <div className="md:h-[70vh] xl:h-[80vh] h-[100vh] relative grid md:grid-cols-2 -mt-6 md:-mt-8 xl:-mt-13 ">
        <div className="relative cursor-pointer flex justify-center items-center bg-[url(/featured-bg-01.svg)] bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 w-full bg-[#ebab9d] opacity-90 hover:opacity-0 transform transition-all duration-800"></div>
          <h1
            className={`relative text-6xl font-bold text-white ${londrina.className} z-10`}
          >
            New Arrivals
          </h1>
        </div>
        <div className="relative cursor-pointer flex justify-center items-center  bg-[url(/featured-bg-02.svg)] bg-cover bg-center">
          {/* Overlay */}
          <div className="absolute inset-0 w-full bg-[#c2d85a] opacity-90  hover:opacity-0 transform transition-all duration-800"></div>
          {/* Text */}
          <h1
            className={`relative text-6xl font-bold text-white z-10 ${londrina.className}`}
          >
            Bestseller
          </h1>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSec;

//Ok Done I am signing off now.
