"use client";
import React, { useState } from "react";
import { Londrina_Solid } from "next/font/google";
import Image from "next/image";
import { useCart } from "@/app/context/cart/Cartcontext";
import { HeartIcon, ShoppingCart, Star } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

type Product = {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images: string[];
  // rating: number;
  category: string;
  shortDescription: string;
  description: string;
  isSale?: boolean;
  ageGroup: string;
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className={`w-4 h-4 ${
            index < rating ? "fill-[#00b8a2] text-[#00b8a2]" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const Products: React.FC = () => {
  const productData: Product[] = [
    //  {
    //     id: 1,
    //     name: "Crocodile Puzzle Crayon",
    //     price: 299,
    //     // rating: 3,
    //     ageGroup: "3+",
    //     category: "Crayons",
    //     image: "/products/2toys3.jpg",
    //     images: ["/products/2toys1.jpg", "/products/2toys2.jpg"],
    //     shortDescription: "Bring your child's imagination to life with the Artiory Jumbo Multicolored Crayon Set. ",
    //     description: "Perfect for kid's 3+, with fun shapes & colors.",
    //   },
      {
        id: 2,
        name: "Dino Puzzle Crayon",
        price: 299,
        oldPrice: 399,
        // rating: 4,
        ageGroup: "3+",
        category: "Puzzle Crayons",
        image: "/products/2toys1.JPG",
        images: ["/products/2toys1.JPG", "/products/2toys3.JPG"],
        shortDescription: "Unleash your child's creativity with the Artiory Dino Puzzle Crayon.",
        description: "Designed for little hands, vibrant & easy grip.",
        isSale: true,
      }
  ];

  const itemsPerPage = 8;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(productData.length / itemsPerPage);
  const paginatedProducts = productData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const { dispatch } = useCart();
  const handleAddToCart = (product: Product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: String(product.id),
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      },
    });
    toast.success(`${product.name} added to cart!`, {
      position: "bottom-right",
      autoClose: 800,
    });
  };

  const { wishlistDispatch, wishlistState } = useWishlist();
  const handleWishlist = (product: Product) => {
    const isInWishlist = wishlistState.items.some(
      (item) => item.id === String(product.id)
    );

    if (isInWishlist) {
      wishlistDispatch({
        type: "REMOVE_FROM_WISHLIST",
        payload: { id: String(product.id) },
      });
      toast.info(`${product.name} removed from Wishlist!`, {
        position: "bottom-right",
        autoClose: 800,
      });
    } else {
      wishlistDispatch({
        type: "ADD_TO_WISHLIST",
        payload: {
          id: String(product.id),
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
      toast.success(`${product.name} added to Wishlist!`, {
        position: "bottom-right",
        autoClose: 800,
      });
    }
  };

  return (
    <section className={`${londrina.className} py-16  bg-white`}>
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#00b8a2]">
          OUR PRODUCTS.
        </h1>
        <p className="text-2xl cursor-pointer mt-3 text-gray-400">
          <Link href="/listing">View All</Link>
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 w-full h-auto sm:w-[86%] md:w-[90%] lg:w-[76%] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto md:px-4 px-2">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="w-full flex justify-center">
            <Link
              href={`/product/${product.id}`}
              className="w-full flex justify-center"
            >
              <div className="group relative flex h-[430px] w-full flex-col rounded-2xl bg-white">
                <span className="absolute top-4 left-4 bg-[#00b8a2] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                  SALE
                </span>

                {/* Icons */}
                <div className="absolute top-2 right-4 flex gap-2 z-10">
                  <button
                    onClick={() => handleWishlist(product)}
                    className="absolute top-3 right-2 cursor-pointer"
                  >
                    <HeartIcon
                      id={String(product.id)}
                      fill={
                        wishlistState.items.some(
                          (item) => item.id === String(product.id)
                        )
                          ? "#00c8a2"
                          : "none"
                      }
                      className="stroke-[#8bd2c9] stroke-2"
                    />
                  </button>
                </div>

                <div className="absolute top-12 cursor-pointer right-6 flex gap-2 z-10">
                  <ShoppingCart
                    onClick={() => handleAddToCart(product)}
                    className="stroke-[#8bd2c9] stroke-2"
                  />
                </div>

                {/* Product Image */}
                <div className="flex h-[260px] w-full items-center justify-center rounded-2xl border border-[#8bd2c9] transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
                  <div className="relative flex h-full w-full items-center justify-center p-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={295}
                      height={295}
                      className="object-contain p-5 duration-500 group-hover:opacity-0"
                    />
                    {product.images[1] && (
                      <Image
                        src={product.images[1]}
                        alt={product.name}
                        fill
                        className="object-contain p-5 opacity-0 duration-500 group-hover:opacity-100"
                      />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between px-2 pt-3 pb-4">
                  <h2 className="line-clamp-2 min-h-[52px] text-[17px] font-medium tracking-[0.2px] text-[#2e306a]">
                    {product.name}
                  </h2>
                  <div className="flex gap-1">
                    <p
                      className={`text-gray-400 font-light text-lg line-through ${londrina.className}`}
                    >
                      &#x20B9;{product.price}.00
                    </p>
                    <p
                      className={`text-[#00b8a2] font-light text-lg ${londrina.className}`}
                    >
                      &#x20B9;{product.price}.00
                    </p>
                  </div>
                  {/* <RatingStars rating={product.rating} /> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`px-3 py-1 cursor-pointer font-extrabold rounded-lg text-[#00b8a2] ${
              page === index + 1 ? "text-white bg-[#00b8a2]" : "text-[#00b8a2]"
            }`}
          >
            {index + 1}
          </button>
        ))}
        {page < totalPages && (
          <button
            onClick={() => setPage(page + 1)}
            className="text-[#00b8a2] font-semibold hover:underline"
          >
            Next
          </button>
        )}
      </div>
      <ToastContainer />
    </section>
  );
};

export default Products;
