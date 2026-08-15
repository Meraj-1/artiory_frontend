import React from "react";
import { Londrina_Solid } from "next/font/google";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Hero = () => {
  return (
    <section className={`min-h-screen flex flex-col justify-center items-center md:px-6 md:py-16 ${londrina.className} `}>
      {/* Heading */}
      <h1
        className={`${londrina.className} text-4xl sm:text-5xl md:text-6xl text-[#2e306a] text-center mb-10`}>
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Side - Contact Info */}
        <div className="flex flex-col justify-center space-y-6 rounded-2xl bg-white p-8">
          <h2 className="text-3xl font-bold text-[#2e306a]">
            Get in Touch
          </h2>
          <p className="text-[#2e306a]">
            Have questions? We&apos;d love to hear from you. Fill out the form or reach us via the details below.
          </p>
          <div>
            <p className="text-[#2e306a]">📍 Address</p>
            <p className="text-[#2e306a]">Chhadva residency, V N Purav Marg, Chembur, Mumbai 400071</p>
          </div>
          <div>
            <p className="text-[#2e306a]">📞 Phone</p>
            <p className="text-[#2e306a]">+91 81085 61836</p>
          </div>
          <div>
            <p className="text-[#2e306a]">✉️ Email</p>
            <p className="text-[#2e306a]">contact@artiory.com</p>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="bg-white rounded-2xl shadow-md p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-[#2e306a] mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12ddc5] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#2e306a] mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12ddc5] outline-none"
              />
            </div>

            <div>
              <label className="block text-[#2e306a] mb-2">
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#12ddc5] outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center bg-[#00ba82] text-[#2e306a] py-2 tracking-[0.1px] cursor-pointer text-lg rounded-lg transition hover:scale-105 duration-200 ease-in-out"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Map Section */}
      {/* <div className="w-full max-w-6xl mt-10 rounded-2xl overflow-hidden shadow-md">
        <iframe
          title="Google Map"
          className="w-full h-64 md:h-96"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.123456789012!2d73.1435969!3d19.2413588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7954bf5212f5d%3A0x95a7546ed0077e47!2sClick%20Trick!5e0!3m2!1sen!2sin!4v0000000000000"
          allowFullScreen={true}
          loading="lazy"
        ></iframe>
      </div> */}
    </section>
  );
};

export default Hero;
