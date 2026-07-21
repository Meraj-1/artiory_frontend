import React from 'react'
import Image from 'next/image'
import { Londrina_Solid } from "next/font/google";
import { Readex_Pro } from "next/font/google";
import { Poppins } from "next/font/google";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"], // Choose the weights you need
  subsets: ["latin"], // Required
  display: "swap", // Avoid layout shift
});

const readex = Readex_Pro({
  weight: ["200", "300", "400", "500", "600", "700"], // choose the weights you need
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"], // optional if you want italic support
  display: "swap",
})



const Hero = () => {
  return (
    <section className='lg:h-[700px] h-3/5 sm:h-4/5 bg-[#00b8a2] md:flex md:justify-center  text-white '>
      <div className="container md:flex md:flex-row items-center pt-10">
        <div className='flex md:flex-1 justify-center flex-col  items-center transform md:-translate-y-20'>
          <h1 className={`${londrina.className} text-5xl lg:text-[5rem] xl:text-[8rem] flex`}>Buy perfect <br />for your kid!</h1>
          <p
            className={`md:text-md text-sm mt-4 text-center md:tracking-[0.2em] xl:text-[1rem] md:font-medium md:mt-10 ${readex.className}`}
          >Bring happiness to your children with our help. <br /> Purchase interesting toys using a special discount.</p>
          <div className={`md:mt-10`}>
            <button className={`bg-white text-2xl font-extrabold cursor-pointer p-10 text-[#00b8a2] px-6 py-2 rounded-full mt-4 ${poppins.className}  hover:bg-gray-200 transition`}>
              Shop Now
            </button>
          </div>
        </div>
        <div className='flex md:flex-1 items-center justify-center mt-4'>
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[550px] lg:h-[800px]">
            <Image
              src="/hero.png"
              alt="hero image"
              fill
              className="object-cover object-top-right lg:object-cover transform -translate-y-6 sm:-translate-y-10 md:-translate-y-14 lg:translate-y-0 -translate-x-12 sm:-translate-x-14 md:-translate-x-1 lg:translate-x-0"
              sizes="(max-width: 640px) 150vw,
                      (max-width: 1024px) 50vw,
                       100vw" priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero