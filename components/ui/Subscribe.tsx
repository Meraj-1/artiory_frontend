import React from "react";
import WaveDivider from "./WaveDivider";
import { Londrina_Solid } from "next/font/google";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Subscribe = () => {
  return (
    <>
      <WaveDivider bgColor="#00b8a2" className="-mb-2" flip />

      <div className="bg-[#00b8a2] flex flex-col justify-center items-center text-white px-6 py-12 md:py-20 lg:py-28 gap-8 min-h-[30vh]">
        {/* Title Section */}
        <div className={`${londrina.className} text-center md:text-left`}>
          <h1 className="text-4xl md:text-6xl text-center leading-tight">
            Subscribe to
            <span className="text-6xl md:text-8xl -mt-2 tracking-[0.7] block">
              Newsletter
            </span>
          </h1>
        </div>

        {/* Input Section */}
        <div className="flex flex-col md:flex-row gap-2 w-full max-w-3xl">
          <input
            type="email"
            placeholder="Your Email"
            className="flex-1 px-4 py-3 rounded-xl outline-none bg-[#00c9ad] text-white placeholder-white"
          />
          <button
            className={`${londrina.className} bg-[#e00a79] text-2xl cursor-pointer px-10 py-3 rounded-xl text-white`}
            onClick={() => alert("Subscribed!")}
          >
            Subscribe
          </button>
        </div>
      </div>

      <div>
        <WaveDivider
          bgColor="#00b8a2"
          className="z-10 transform -translate-y-1"
        />
      </div>
    </>
  );
};

export default Subscribe;
