import React from "react";
import { Londrina_Solid } from "next/font/google";
import WaveDivider from "./WaveDivider";
import Image from "next/image";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const categories = [
  { img: "/category/1.png", title: "Art & Craft" },
  { img: "/category/2.png", title: "Stationery" },
  { img: "/category/3.png", title: "Art & Craft" },
  { img: "/category/4.png", title: "Bags" },
  { img: "/category/5.png", title: "Pouches" },
  { img: "/category/5.png", title: "Drinkware" },
  { img: "/category/5.png", title: "Gifts & Fun" },
];

const ShopByCategory = () => {
  return (
    <>
      {/* Top Wave Divider */}
      <WaveDivider bgColor="#89d5c3" className="mb-[-2px] -mt-5 md:-mt-6 lg:-mt-9 xl:-mt-17" flip />

      <section className="flex flex-col w-full bg-[#89d5c3] relative z-10 justify-center items-center px-4 py-10">
        {/* Heading */}
        <h1
          className={`${londrina.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-center mb-8`}
        >
          Shop By Category
        </h1>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-8 max-w-7xl mx-auto">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Image Circle */}
              <div className="relative flex justify-center items-center rounded-full bg-white shadow-md 
                h-[8rem] w-[8rem] 
                sm:h-[12rem] sm:w-[12rem] 
                md:h-[14rem] md:w-[14rem] 
                lg:h-[15rem] lg:w-[15rem] 
                transition-transform hover:scale-105">
                <Image
                  width={300}
                  height={300}
                  src={cat.img}
                  alt={cat.title}
                  className="rounded-full w-[100%] h-[100%]"
                />
              </div>

              {/* Title */}
              <h2
                className={`text-white ${londrina.className} text-sm sm:text-lg md:text-xl lg:text-2xl text-center font-medium mt-3 sm:mt-5`}
              >
                {cat.title}
              </h2>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Wave Divider */}
      <WaveDivider bgColor="#89d5c3" className="mt-[-2px]" />
    </>
  );
};

export default ShopByCategory;
