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
  image: string;
  name: string;
  price: number;
  sku: string;
  ageGroup: string;
  category: string;
  shortDescription: string;
  description: string;
  rating: number;
  images: string[];
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
    {
      id: 1,
      name: "PUZZLE-CRAYONS",
      price: 299,
      image: "/products/1toys1.jpg",
      images: ["/products/1toys1.jpg", "/products/1toys2.jpg"],
      sku: "PC-001",
      ageGroup: "3+",
      rating: 4,
      category: "Art Supplies",
      shortDescription: "Bright and colorful puzzle crayons for kid's.",
      description:
        "These puzzle crayons are perfect for children aged 3 and above. They come in a variety of bright colors and can be easily assembled into fun shapes, making coloring time even more enjoyable.",
    },
    {
      id: 2,
      name: "JUMBO-MULTI-COLOUR-CRAYON",
      price: 299,
      sku: "JMC-001",
      ageGroup: "3+",
      rating: 3,
      category: "Art Supplies",
      image: "/products/2toys1.jpg",
      images: ["/products/2toys1.jpg", "/products/2toys2.jpg"],
      shortDescription: "Large, easy-to-hold crayons in multiple colors.",
      description:
        "These jumbo multi-color crayons are designed for little hands. They are easy to grip and come in a variety of vibrant colors, making them ideal for young artists to explore their creativity.",
    },
    {
      id: 3,
      name: "BALANCE-CRAYONS",
      price: 299,
      image: "/products/3toys1.jpg",
      images: ["/products/3toys1.jpg", "/products/3toys2.jpg"],
      sku: "BC-001",
      ageGroup: "3+",
      rating: 4,
      category: "Art Supplies",
      shortDescription: "Ergonomically designed crayons for better grip.",
      description:
        "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
    },
    {
      id: 4,
      name: "PUZZLE-CRAYONS",
      price: 299,
      image: "/products/4toys1.jpg",
      images: ["/products/4toys1.jpg", "/products/4toys2.jpg"],
      sku: "PC-001",
      ageGroup: "3+",
      rating: 5,
      category: "Art Supplies",
      shortDescription: "Bright and colorful puzzle crayons for kid's.",
      description:
        "These puzzle crayons are perfect for children aged 3 and above. They come in a variety of bright colors and can be easily assembled into fun shapes, making coloring time even more enjoyable.",
    },
    {
      id: 5,
      name: "PUZZLE-CRAYONS",
      price: 299,
      image: "/products/5toys1.jpg",
      images: ["/products/5toys1.jpg", "/products/5toys2.jpg"],
      sku: "PC-001",
      ageGroup: "3+",
      rating: 4,
      category: "Art Supplies",
      shortDescription: "Bright and colorful puzzle crayons for kid's.",
      description:
        "These puzzle crayons are perfect for children aged 3 and above. They come in a variety of bright colors and can be easily assembled into fun shapes, making coloring time even more enjoyable.",
    },
    {
      id: 6,
      name: "JUMBO-MULTI-COLOUR-CRAYON",
      price: 299,
      sku: "JMC-001",
      ageGroup: "3+",
      rating: 3,
      category: "Art Supplies",
      image: "/products/6toys1.jpg",
      images: ["/products/6toys1.jpg", "/products/6toys2.jpg"],
      shortDescription: "Large, easy-to-hold crayons in multiple colors.",
      description:
        "These jumbo multi-color crayons are designed for little hands. They are easy to grip and come in a variety of vibrant colors, making them ideal for young artists to explore their creativity.",
    },
    {
      id: 7,
      name: "BALANCE-CRAYONS",
      price: 299,
      image: "/products/7toys1.jpg",
      images: ["/products/7toys1.jpg", "/products/7toys2.jpg"],
      sku: "BC-001",
      ageGroup: "3+",
      rating: 4,
      category: "Art Supplies",
      shortDescription: "Ergonomically designed crayons for better grip.",
      description:
        "Balance crayons are ergonomically designed to provide a comfortable grip for children. They help improve hand coordination and make coloring easier and more enjoyable for young artists.",
    },
    {
      id: 8,
      name: "PUZZLE-CRAYONS",
      price: 299,
      image: "/products/8toys1.jpg",
      images: ["/products/8toys1.jpg", "/products/8toys2.jpg"],
      sku: "PC-001",
      ageGroup: "3+",
      rating: 1,
      category: "Art Supplies",
      shortDescription: "Bright and colorful puzzle crayons for kid's.",
      description:
        "These puzzle crayons are perfect for children aged 3 and above. They come in a variety of bright colors and can be easily assembled into fun shapes, making coloring time even more enjoyable.",
    },
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
          <Link href="/product">View All</Link>
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 w-full h-auto sm:w-[86%] md:w-[90%] lg:w-[76%] md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 mx-auto md:px-4 px-2">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="w-full flex justify-center">
            <Link
              href={`/product/${product.id}`}
              className="w-full flex justify-center"
            >
              <div className="bg-white h-auto flex flex-col items-center w-full aspect-[295/398] relative">
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
                <div className="w-full border transition-all ease-in-out duration-500  hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[#8bd2c9] rounded-2xl cursor-pointer flex justify-center">
                  <div className="w-auto h-auto p-2 aspect-square flex justify-center items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={295}
                      height={295}
                      className="object-contain p-3 duration-500 group-hover:opacity-0"
                    />
                    {product.images[1] && (
                      <Image
                        src={product.images[1]}
                        alt={product.name}
                        fill
                        className="object-contain p-10 duration-500 opacity-0 group-hover:opacity-100"
                      />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="w-full px-1 pb-4 pt-1">
                  <h2 className="tracking-[0.2px] font-light text-[#2e306a] md:text-lg">
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
                  <RatingStars rating={product.rating} />
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
