import React from "react";
import { Londrina_Solid } from "next/font/google";
import WaveDivider from "./WaveDivider";
import Image from "next/image";
import Link from "next/link";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const categories = [
  { img: "/category/Art&Craft.png", title: "Art & Craft" },
  { img: "/category/Stationery.jpeg", title: "Stationery" },
  { img: "/category/Bags.jpg.jpeg", title: "Bags" },
  { img: "/category/Pouches.jpeg", title: "Pouches" },
  { img: "/category/Drinkware.jpeg", title: "Drinkware" },
  { img: "/category/Gifts&Fun.jpeg", title: "Gifts & Fun" },
];

const ShopByCategory = () => {
  return (
    <>
      <WaveDivider bgColor="#89d5c3" className="mb-[-2px] -mt-5 md:-mt-6 lg:-mt-9 xl:-mt-17" flip />

      <section className="w-full bg-[#89d5c3] relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12">

          {/* Heading */}
          <div className="text-center mb-10 sm:mb-14">
            <h1 className={`${londrina.className} text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white font-900 tracking-wide`}>
              Shop By Category
            </h1>
            <p className={`${londrina.className} text-white/70 text-base sm:text-lg mt-2 font-300`}>
              Explore our curated collections
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
            {categories.map((cat, index) => (
              <Link
                key={index}
                href={`/listing?category=${encodeURIComponent(cat.title)}`}
                className="group flex flex-col items-center gap-3 sm:gap-4"
              >
                {/* Circle */}
                <div className="relative w-full aspect-square rounded-full overflow-hidden bg-white shadow-lg ring-2 ring-white/40 group-hover:ring-white group-hover:shadow-2xl group-hover:scale-105 transition-all duration-300">
                  <Image
                    src={cat.img}
                    alt={cat.title}
                    fill
                    className="object-cover rounded-full"
                    sizes="(max-width: 640px) 30vw, (max-width: 1024px) 18vw, 14vw"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 rounded-full bg-[#1e1e4d]/0 group-hover:bg-[#1e1e4d]/20 transition-all duration-300" />
                </div>

                {/* Title */}
                <span className={`${londrina.className} text-white text-xs sm:text-sm lg:text-base xl:text-lg font-400 text-center leading-tight group-hover:text-white/80 transition-colors duration-200`}>
                  {cat.title}
                </span>
              </Link>
            ))}
          </div>

        </div>
      </section>

      <WaveDivider bgColor="#89d5c3" className="mt-[-2px]" />
    </>
  );
};

export default ShopByCategory;
