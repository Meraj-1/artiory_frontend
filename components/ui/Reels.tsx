"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { useCart } from "@/app/context/cart/Cartcontext";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import Link from "next/link";
import { toast } from "react-toastify";
import { X, Heart, ShoppingCart, Share2 } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import ReadMoreText from "../hooks/ReadMoreText";
import { Londrina_Solid } from "next/font/google";
import WaveDivider from "./WaveDivider";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});
// 
interface ReelType {
  id: number;
  video: string;
  bio: string;
  name: string;
  price: number;
  image: string;
}

const reels: ReelType[] = [
  {
    id: 1,
    video: "https://www.pexels.com/download/video/4620563/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam distinctio mollitia excepturi expedita cupiditate tempore aliquid saepe illo, harum corrupti repellat unde ratione error, placeat quia dolores dicta labore.",
    name: "PUZZLE-CRAYONS",
    price: 299,
    image: "/products/1toys1.jpg",

  },
  {
    id: 2,
    video: "https://www.pexels.com/download/video/3676905/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam distinctio mollitia excepturi expedita cupiditate tempore aliquid saepe illo, harum corrupti repellat unde ratione error, placeat quia dolores dicta labore.",
    name: "JUMBO-MULTI-COLOUR-CRAYON",
    price: 299,
    image: "/products/2toys1.jpg",

  },
  {
    id: 3,
    video: "https://www.pexels.com/download/video/3676822/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam distinctio mollitia excepturi expedita cupiditate tempore aliquid saepe illo, harum corrupti repellat unde ratione error, placeat quia dolores dicta labore.",
    name: "BALANCE-CRAYONS",
    price: 299,
    image: "/products/3toys1.jpg",

  },
  {
    id: 4,
    video: "https://www.pexels.com/download/video/8160567/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam distinctio mollitia excepturi expedita cupiditate tempore aliquid saepe illo, harum corrupti repellat unde ratione error, placeat quia dolores dicta labore.",
    name: "PUZZLE-CRAYONS",
    price: 299,
    image: "/products/4toys1.jpg",

  },
  {
    id: 5,
    video: "https://www.pexels.com/download/video/5534130/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam distinctio mollitia excepturi expedita cupiditate tempore aliquid saepe illo, harum corrupti repellat unde ratione error, placeat quia dolores dicta labore.",
    name: "PUZZLE-CRAYONS",
    price: 299,
    image: "/products/5toys1.jpg",

  },
  {
    id: 6,
    video: "https://www.pexels.com/download/video/8045028/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam distinctio mollitia excepturi expedita cupiditate tempore aliquid saepe illo, harum corrupti repellat unde ratione error, placeat quia dolores dicta labore.",
    name: "JUMBO-MULTI-COLOUR-CRAYON",
    price: 299,
    image: "/products/6toys1.jpg",

  },
  {
    id: 7,
    video: "https://www.pexels.com/download/video/7509040/",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur veniam distinctio mollitia excepturi expedita cupiditate tempore aliquid saepe illo, harum corrupti repellat unde ratione error, placeat quia dolores dicta labore.",
    name: "BALANCE-CRAYONS",
    price: 299,
    image: "/products/7toys1.jpg",

  },
];

const Reels = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [showCard, setShowCard] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() =>
      setShowCard(true), 2000);
    return () => clearTimeout(timer);
  })


  const { dispatch } = useCart();
  const handleAddToCart = (item: ReelType) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: String(item.id),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      }
    });
    toast.success(`${item.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 800,
    })
  };

  const { wishlistDispatch, wishlistState } = useWishlist();
  const handleWishlist = (item: ReelType) => {
    const isInWishlist = wishlistState.items.some(
      (wishItem) => wishItem.id === String(item.id));
    if (isInWishlist) {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { id: String(item.id) }
      })
      toast.info(`${item.name} removed from wishlist!`, {
        position: "bottom-right",
        autoClose: 800,
      });
    }
    else {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: {
          id: String(item.id),
          name: item.name,
          price: item.price,
          image: item.image,
        }
      });
      toast.success(
        `${item.name} added to wishlist!`, {
        position: "bottom-right",
        autoClose: 800,
      }
      )
    }
  }

  return (
    <>
      {/* TOP DIVIDER */}
      <WaveDivider bgColor="#00b8a2" className="-mb-22" flip />

      {/* MAIN SECTION */}
      <section className={`h-auto flex flex-col justify-center mt-20 items-center bg-[#00b8a2] ${londrina.className} `}>
        <div className="pb-16 w-full flex flex-col items-center">

          {/* Heading */}
          <div className="mb-6 text-center z-10">
            <h1 className={`${londrina.className} lg:text-7xl text-4xl text-white`}>
              SHOP OUR REELS
            </h1>
            <p className={`${londrina.className} font-light text-xl text-white cursor-pointer hover:underline`}>
              View All
            </p>
          </div>

          {/* HORIZONTAL SLIDER */}
          <div className="w-full max-w-6xl">
            <Swiper
              spaceBetween={20}
              slidesPerView={3}
              loop
              breakpoints={{
                320: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1440: { slidesPerView: 5 },
              }}
              className="px-6"
            >
              {reels.map((item, index) => (
                <SwiperSlide key={item.id}>
                  <div
                    onClick={() => setActiveIndex(index)}
                    className="rounded-2xl bg-white aspect-[9/16] shadow-xl cursor-pointer overflow-hidden"
                  >
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="rounded-xl w-full h-full object-cover"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </section>

      {/* ✅ POPUP FULL SCREEN REEL VIEWER */}
      {activeIndex !== null && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center backdrop-blur-sm animate-zoom">

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setActiveIndex(null)}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:rotate-90 cursor-pointer duration-500 hover:scale-110 transition-transform"
          >
            <X size={30} />
          </button>

          {/* POPUP VIEWPORT */}
          <div className="w-[380px] max-w-[90%] h-[70vh] rounded-2xl overflow-hidden bg-black shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <Swiper
              direction="vertical"
              slidesPerView={1}
              loop
              mousewheel={{ forceToAxis: true, releaseOnEdges: true }}
              modules={[Mousewheel]}
              initialSlide={activeIndex}
              className="w-full h-full"
            >
              {reels.map((item) => (

                <SwiperSlide key={item.id}>
                  <div className="relative w-full h-full overflow-hidden">


                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-32 right-4 flex flex-col items-center gap-5 z-[20]">

                      <button
                        onClick={() => handleWishlist(item)}
                        className="text-white hover:scale-110 transition-transform active:scale-95"
                      >
                        <Heart
                          id={String(item.id)}
                          fill={
                            wishlistState.items.some(
                              (wishItem) => wishItem.id === String(item.id)
                            )
                              ? "#00c8a2"
                              : "none"
                          }
                          className="cursor-pointer"
                          size={28}
                        />
                      </button>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="text-white hover:scale-110 transition-transform active:scale-95"
                      >
                        <ShoppingCart size={28} />
                      </button>
                      <button
                        onClick={() => {
                          if (navigator.share) {
                            navigator
                              .share({
                                title: item.name || "Check out this product!",
                                text: "Found this amazing reel/product — have a look!",
                                url:
                                  typeof window !== "undefined" ? window.location.href : "",
                              })
                              .then(() => console.log("Shared successfully"))
                              .catch((err) => console.log("Share canceled:", err));
                          } else {
                            alert("Sharing not supported on this device");
                          }
                        }}
                        className="text-white hover:scale-110 transition-transform active:scale-95"
                      >
                        <Share2 size={28} />
                      </button>
                    </div>
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent px-3 pt-3 pb-2">
                      <Image
                        src="/Artiory-Logo.svg"
                        width={60}
                        height={60}
                        className="w-20 h-auto cursor-pointer select-none"
                        alt="logo"
                      />
                      <div>
                        <ReadMoreText text={item.bio} limit={50} />
                      </div>
                    </div>

                    <div
                      className={`absolute bottom-24 pl-1 w-[21rem] transition-all duration-700 ${showCard
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-5 pointer-events-none"
                        }`}
                    >
                      <Link
                        href={`/product/${item.id}`}
                        className="w-full flex justify-center"
                      >
                        <div className="flex items-center justify-between bg-white backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-3 hover:scale-[1.02] transition-transform duration-300">
                          {/* LEFT: PRODUCT INFO */}
                          <div className="flex items-center gap-3">

                            <Image
                              src={item.image}
                              alt={item.name}
                              width={56}
                              height={56}
                              className="w-14 h-14 object-cover rounded-xl shadow-sm border border-gray-200"
                            />
                            <div className="flex flex-col">
                              <h3 className="text-[#1e1e4d] font-semibold text-sm leading-tight line-clamp-1">
                                {item.name}
                              </h3>
                              <p className="text-teal-600 text-xs font-medium">
                                ₹{item.price}.00
                              </p>
                            </div>
                          </div>

                          {/* RIGHT: SHOP BUTTON */}
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="px-3 py-1.5 text-xs bg-[#1e1e4d] text-white rounded-full hover:bg-[#333377] active:scale-95 transition-all duration-200"
                          >
                            Shop Now
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

            </Swiper>
          </div>
        </div>
      )}

      <WaveDivider bgColor="#00b8a2" className="z-10 -translate-y-1" />
    </>
  );
};

export default Reels;
