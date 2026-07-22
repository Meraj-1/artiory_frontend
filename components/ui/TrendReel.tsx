import React from "react";
import { Londrina_Solid } from "next/font/google";
import Image from "next/image";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const products = [
  { id: 1, img: "/trend/1.jpg", title: "Cute Flower Design Sunglass for kid's", rating: "4.5 (2)", regularPrice: "Regular priceRs. 199.00", salePrice: "Rs. 99.00" },
  { id: 2, img: "/trend/2.jpg", title: "Stylish Pink Sunglass for Girls", rating: "4.8 (5)", regularPrice: "Regular priceRs. 199.00", salePrice: "Rs. 149.00" },
  { id: 3, img: "/trend/3.jpg", title: "Cool Black Shades for Boys", rating: "4.3 (3)", regularPrice: "Regular priceRs. 199.00", salePrice: "Rs. 129.00" },
  { id: 4, img: "/trend/4.jpg", title: "Trendy Oval Sunglass for kid's", rating: "4.7 (4)", regularPrice: "Regular priceRs. 199.00", salePrice: "Rs. 139.00" },
  { id: 5, img: "/trend/5.webp", title: "Cute Cartoon Sunglass", rating: "4.9 (6)", regularPrice: "Regular priceRs. 199.00", salePrice: "Rs. 159.00" },
];

const TrendReel = () => {
  return (
    <section className="min-h-[50vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 py-10 bg-white">
      {/* Heading */}
      <div className="text-center">
        <h1 className={`${londrina.className} text-3xl sm:text-4xl lg:text-6xl text-[#00b8a2]`}>
          TRENDING ON REEL
        </h1>
        <p className="text-[#a4a4a4] text-sm sm:text-base">
          Discover what&apos;s trending on social media!
        </p>
      </div>

      {/* View All Button */}
      <div className="mt-6">
        <h1
          className="text-lg sm:text-xl font-bold cursor-pointer text-center text-[#00b8a2] hover:underline"
          onClick={() => alert("View ALL Clicked")}
        >
          View All
        </h1>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2  mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center  bg-white cursor-pointer"
          >
            {/* Product Image */}
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-68 lg:h-68 p-6 border-1 border-[#8bd2c9] flex justify-center items-center overflow-hidden cursor-pointer">
              <Image
                src={product.img}
                alt={product.title}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center items-center mt-3 text-center space-y-1">
              <h3 className="text-xs sm:text-sm md:text-base max-w-[10em] text-[#00b8a2] font-bold leading-tight">
                {product.title}
              </h3>
              <p className="text-[0.7rem] sm:text-xs md:text-sm font-bold text-[#a4a4a4]">
                 {product.rating}
              </p>
              <span className="text-[0.7rem] sm:text-xs md:text-sm font-bold text-[#a4a4a4] ">
                {product.regularPrice}
              </span>
              <p className="text-xs sm:text-sm md:text-base text-[#a4a4a4] font-bold">
                {product.salePrice}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendReel;
