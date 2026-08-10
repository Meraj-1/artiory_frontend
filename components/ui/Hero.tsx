// import React from 'react'
// import Image from 'next/image'
// import { Londrina_Solid } from "next/font/google";
// import { Readex_Pro } from "next/font/google";
// import { Poppins } from "next/font/google";

// const londrina = Londrina_Solid({
//   weight: ["100", "300", "400", "900"], // Choose the weights you need
//   subsets: ["latin"], // Required
//   display: "swap", // Avoid layout shift
// });

// const readex = Readex_Pro({
//   weight: ["200", "300", "400", "500", "600", "700"], // choose the weights you need
//   subsets: ["latin"],
//   display: "swap",
// });

// const poppins = Poppins({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
//   style: ["normal", "italic"], // optional if you want italic support
//   display: "swap",
// })



// const Hero = () => {
//   return (
//     <section className='lg:h-[700px] h-3/5 sm:h-4/5 bg-[#00b8a2] md:flex md:justify-center  text-white '>
//       <div className="container md:flex md:flex-row items-center pt-10">
//         <div className='flex md:flex-1 justify-center flex-col  items-center transform md:-translate-y-20'>
//           <h1 className={`${londrina.className} text-5xl m-2 md:m-0 lg:text-[5rem] xl:text-[5.4rem] flex`}>Inspired by Childhood.<br />Designed for Every Day.</h1>
//           <p
//             className={`md:text-md text-sm mt-4 text-center md:tracking-[0.2em] xl:text-[1rem] md:font-medium md:mt-10 ${readex.className}`}
//           >From school essentials and creative supplies to premium gifts and everyday accessories, Artiory brings thoughtfully curated products that make every childhood moment memorable.</p>
//           <div className={`md:mt-10`}>
//             <button className={`bg-white text-2xl font-extrabold cursor-pointer p-10 text-[#00b8a2] px-6 py-2 rounded-full mt-4 ${poppins.className}  hover:bg-gray-200 transition`}>
//               Shop Now
//             </button>
//           </div>
//         </div>
//         <div className='flex md:flex-1 items-center justify-center mt-4'>
//           <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[800px]">
//             <Image
//               src="/hero.png"
//               alt="hero image"
//               fill
//               className="object-cover object-top-right lg:object-cover transform -translate-y-6 sm:-translate-y-10 md:-translate-y-14 lg:translate-y-0 -translate-x-12 sm:-translate-x-14 md:-translate-x-1 lg:translate-x-0"
//               sizes="(max-width: 640px) 150vw,
//                       (max-width: 1024px) 50vw,
//                        100vw" priority
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero


"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

const images = ["/crouser1.jpeg", "/crouser2.jpeg"];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      {/* Carousel */}
      <div className="relative w-full h-[500px] md:h-[600px] lg:h-[90vh]">
        {images.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            <Image
              src={image}
              alt={`Artiory Banner ${index + 1}`}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;

