"use client";
import React from "react";
import { Londrina_Solid } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/app/context/cart/Cartcontext";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import { toast } from "react-toastify";

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
};

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1 mt-1">
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

const RelatedProducts: React.FC = () => {
  const sampleProducts: Product[] = [
    {
      id: 1,
      name: "PUZZLE-CRAYONS",
      price: 299,
      image: "/products/1toys1.jpg",
      sku: "PC-001",
      ageGroup: "3+",
      rating: 4,
      category: "Art Supplies",
      shortDescription: "Bright and colorful puzzle crayons for kids.",
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
      shortDescription: "Large, easy-to-hold crayons in multiple colors.",
      description:
        "These jumbo multi-color crayons are designed for little hands. They are easy to grip and come in a variety of vibrant colors, making them ideal for young artists to explore their creativity.",
    },
    {
      id: 3,
      name: "BALANCE-CRAYONS",
      price: 299,
      image: "/products/3toys1.jpg",
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
      name: "COLORING-BOOK",
      price: 199,
      image: "/products/4toys1.jpg",
      sku: "CB-001",
      ageGroup: "3+",
      rating: 5,
      category: "Books",
      shortDescription: "Fun coloring book for kids.",
      description:
        "Creative activity book with drawings to color, designed to inspire kids’ imagination.",
    },
  ];

  const { dispatch } = useCart();
  const { wishlistDispatch, wishlistState } = useWishlist();

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
    <section className={`${londrina.className} py-16 bg-white`}>
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#00b8a2]">
          RELATED PRODUCTS
        </h1>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 w-[90%] mx-auto">
        {sampleProducts.map((product) => (
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleWishlist(product);
                    }}
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleAddToCart(product);
                    }}
                    className="stroke-[#8bd2c9] stroke-2"
                  />
                </div>

                {/* Product Image */}
                <div className="w-full border transition-all ease-in-out duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-[#8bd2c9] rounded-2xl cursor-pointer p-3 flex justify-center">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 flex justify-center items-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={295}
                      height={295}
                      className="object-contain w-full h-full aspect-square"
                    />
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
                      &#x20B9;{product.price + 100}.00
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
    </section>
  );
};

export default RelatedProducts;
