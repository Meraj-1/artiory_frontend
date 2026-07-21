"use client";

import Image from "next/image";
import { Trash2, Heart } from "lucide-react";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import { useCart } from "@/app/context/cart/Cartcontext";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { Londrina_Solid } from "next/font/google";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function Wishlist() {
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();

  const handleRemoveFromWishlist = (id: string) => {
    wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id } });
    toast.success(`Item Removed form Wishlist!`, {
      position: "bottom-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  type WishlistItem = {
    id: string;
    name: string;
    price: number;
    image: string;
    // add other fields if needed
  };

  const handleAddToCart = (item: WishlistItem) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: { ...item, id: String(item.id), quantity: 1 },
    });
    toast.success(`added to cart!`, {
      position: "bottom-right",
      autoClose: 800,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">

          <Heart className="text-[#1e1e4d]" size={50} />
          <p className="text-xl font-semibold text-[#1e1e4d] mb-2">
            Your Wishlist is Empty
          </p>

          <p className="text-gray-600 mb-5">
            Start adding your favourite products now.
          </p>
          <Link href="/listing">
            <button
              // onClick={() => navigate("/shop")}
              className="px-6 py-2 cursor-pointer transition-all duration-300 bg-[#1e1e4d] text-white rounded-xl shadow-md hover:bg-[#5b5ba1] hover:scale-105"

            >
              Browse Products
            </button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className={`container mx-auto px-4 py-10 ${londrina.className}`}>
      <h2 className="text-4xl text-[#2e306a] mb-6">Your Wishlist</h2>

      <div className="hidden md:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center transform -translate-x-9">Action</th>
            </tr>
          </thead>
          <tbody>
            {wishlistState.items.map((item) => (
              <tr key={item.id} className="border-b relative">
                <td className="p-3 flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={70}
                    height={70}
                    className="rounded h-auto w-22"
                  />
                  <span>{item.name}</span>
                </td>
                <td className="p-3">&#x20B9;{item.price}</td>
                <td className="p-3 whitespace-nowrap">
                  <div className="flex items-center space-x-2 justify-center">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-blue-600 text-white px-3 py-1 cursor-pointer rounded hover:bg-blue-700"
                    >
                    Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {wishlistState.items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 flex flex-col gap-3"
          >
            <div className="flex gap-3 items-center">
              <Image
                src={item.image}
                alt={item.name}
                width={60}
                height={60}
                className="rounded"
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600 text-sm">&#x20B9;{item.price}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ToastContainer />
    </div>
  );
}
