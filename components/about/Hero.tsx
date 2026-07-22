import React from "react";
import Image from "next/image";
import { Londrina_Solid } from "next/font/google";
import { FaShieldAlt, FaSmile, FaPalette, FaGift } from "react-icons/fa";

const londrina = Londrina_Solid({
  weight: ["300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Hero = () => {
  return (
    <section className="bg-white">
      {/* HERO */}
      <div className="bg-[#2e306a] ">
        <div className="max-w-6xl mx-auto px-6 py-13 text-center">
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl text-white ${londrina.className}`}
          >
            About Us – Artiory
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl text-[#2e306a] mx-auto px-6 py-20 flex flex-col gap-8">
        {/* First Paragraph with Image Side */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* IMAGE */}
          <div className="flex-shrink-0">
            <Image
              src="/Artiory-Logo.svg"
              alt="Artiory Logo"
              width={400}
              height={400}
              className="object-contain rounded-lg"
            />
          </div>
          {/* FIRST PARAGRAPH */}
          <p
            className={`${londrina.className} text-xl font-light leading-relaxed`}
          >
            At{" "}
            <span className="font-bold tracking-[0.5px]  text-[#2e306a]">
              Artiory
            </span>
            , we believe childhood should be filled with joy, wonder, and
            creativity. That's why we've created a one-stop destination for
            premium kid's products and gifting solutions that are as fun as they
            are functional. From colorful crayons and school essentials to
            stylish bottles, lunchboxes, hampers, and thoughtful return gifts,
            every product at Artiory is designed to bring smiles to children
            while giving parents the trust of quality and safety. Our mission is
            simple: To make every moment of childhood brighter and every
            parent's choice easier. We combine playfulness with practicality,
            offering durable, safe, and thoughtfully curated products that kid's
            love and parents rely on.
          </p>
        </div>

        {/* Remaining Paragraphs */}
        <div className="flex flex-col gap-6 ">
          <p
            className={`${londrina.className} text-xl font-light leading-relaxed`}
          >
            Whether it's for school, birthdays, or special occasions, Artiory
            ensures that gifting and shopping for kid's is joyful, effortless,
            and meaningful.
          </p>
          <p
            className={`${londrina.className} text-xl font-light leading-relaxed`}
          >
            What sets us apart is our attention to detail and design. Every
            Artiory product is handpicked for its quality, utility, and appeal.
            We focus on providing collections that are affordable
          </p>
          {/* <p
            className={`${londrina.className} text-xl font-light leading-relaxed`}
          >
            Based in India, we proudly serve families across the country, making
            sure that every order is delivered with care and timeliness. And
            with a brand built on trust, joy, and creativity, Artiory is here to
            become a part of every child's growing-up story.
          </p> */}
        </div>
      </div>

      {/* VALUES */}
      {/* <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        <div className="flex hover:shadow-xl shadow-[#2e306a] rounded-2xl  flex-col items-center p-4 hover:scale-110 duration-700 transition-transform cursor-pointer">
          <FaShieldAlt className="text-5xl text-[#2e306a] mb-4" />
          <h3
            className={`text-xl tracking-[0.5px] text-[#2e306a] mb-2 ${londrina.className}`}
          >
            Safety
          </h3>
          <p
            className={`${londrina.className} text-[#2e306a] text-md font-light`}
          >
            Every product is child-safe and durable.
          </p>
        </div>
        <div className="flex hover:shadow-xl shadow-[#2e306a] rounded-2xl  flex-col items-center p-4 hover:scale-110 duration-700 transition-transform cursor-pointer">
          <FaSmile className="text-5xl text-[#2e306a] mb-4" />
          <h3
            className={`text-xl tracking-[0.5px] text-[#2e306a] mb-2 ${londrina.className}`}
          >
            Joy
          </h3>
          <p
            className={`${londrina.className} text-[#2e306a] text-md font-light`}
          >
            Products that spark happiness in every child.
          </p>
        </div>
        <div className="flex hover:shadow-xl shadow-[#2e306a] rounded-2xl  flex-col items-center p-4 hover:scale-110 duration-700 transition-transform cursor-pointer">
          <FaPalette className="text-5xl text-[#2e306a] mb-4" />
          <h3
            className={`text-xl tracking-[0.5px] text-[#2e306a] mb-2 ${londrina.className}`}
          >
            Creativity
          </h3>
          <p
            className={`${londrina.className} text-[#2e306a] text-md font-light`}
          >
            Encouraging imagination and fun learning.
          </p>
        </div>
        <div className="flex hover:shadow-xl shadow-[#2e306a] rounded-2xl  flex-col items-center p-4 hover:scale-110 duration-700 transition-transform cursor-pointer">
          <FaGift className="text-5xl text-[#2e306a] mb-4" />
          <h3
            className={`text-xl tracking-[0.5px] text-[#2e306a] mb-2 ${londrina.className}`}
          >
            Gifting
          </h3>
          <p
            className={`${londrina.className} text-[#2e306a] text-md font-light`}
          >
            Thoughtful, practical gifts for every occasion.
          </p>
        </div>
      </div> */}

      {/* CTA */}
      <div className={` ${londrina.className} text-[#2e306a]`}>
        <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Experience Artiory Today
          </h2>
          <p className="mt-4 text-lg max-w-xl">
            Discover thoughtfully curated kid's products that bring joy and
            convenience to everyday life.
          </p>
          <button className="mt-6 bg-white text-[#2e306a] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition">
            Explore Our Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
