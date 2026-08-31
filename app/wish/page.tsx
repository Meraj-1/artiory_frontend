"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2, Heart, ShoppingCart, AlertCircle, CheckCircle2 } from "lucide-react";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import { useCart } from "@/app/context/cart/Cartcontext";
import { toast, ToastContainer } from "react-toastify";
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
  const [stockInfo, setStockInfo] = useState<Record<string, number>>({});

  // Verify and fetch live product stock for each wishlist item
  useEffect(() => {
    if (!wishlistState.items || wishlistState.items.length === 0) return;

    wishlistState.items.forEach(async (item) => {
      if (item.stock !== undefined && item.stock !== null) {
        setStockInfo((prev) => ({ ...prev, [item.id]: item.stock! }));
      } else {
        try {
          const res = await fetch(`/api/products/${item.id}`, { cache: "no-store" });
          if (res.ok) {
            const data = await res.json();
            const p = data?.product ?? data?.data ?? data;
            const stock = Number(p?.stockQuantity ?? 0);
            setStockInfo((prev) => ({ ...prev, [item.id]: stock }));
          }
        } catch (e) {
          console.error("Failed to check stock for wishlist item:", item.id, e);
        }
      }
    });
  }, [wishlistState.items]);

  const handleRemoveFromWishlist = (id: string) => {
    wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id } });
    toast.success("Item removed from Wishlist!", {
      position: "bottom-right",
      autoClose: 600,
    });
  };

  const isItemOutOfStock = (item: any) => {
    if (stockInfo[item.id] !== undefined) {
      return stockInfo[item.id] <= 0;
    }
    if (item.isOutOfStock !== undefined) {
      return item.isOutOfStock;
    }
    if (item.stock !== undefined) {
      return item.stock <= 0;
    }
    if (item.stockQuantity !== undefined) {
      return item.stockQuantity <= 0;
    }
    return false;
  };

  const handleAddToCart = (item: any) => {
    const outOfStock = isItemOutOfStock(item);
    if (outOfStock) {
      toast.error(`"${item.name}" is currently Out of Stock and cannot be added to cart.`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }

    const currentStock = stockInfo[item.id] ?? item.stock ?? 999;

    cartDispatch({
      type: "ADD_ITEM",
      payload: {
        id: String(item.id),
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
        stock: currentStock,
        isOutOfStock: false,
      },
    });

    toast.success(`"${item.name}" added to cart!`, {
      position: "bottom-right",
      autoClose: 1000,
    });
  };

  if (wishlistState.items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50/50">
        <div className="flex flex-col items-center justify-center h-[60vh] text-center p-6 space-y-4">
          <div className="w-20 h-20 bg-rose-50 border-2 border-rose-100 rounded-full flex items-center justify-center text-rose-500 shadow-xs">
            <Heart size={42} />
          </div>
          <h2 className={`text-3xl font-black text-[#1e1e4d] ${londrina.className}`}>
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 text-sm max-w-sm">
            Explore our handcrafted collection and save your favorite pieces to shop anytime.
          </p>
          <Link href="/listing">
            <button className="px-6 py-3 bg-[#1e1e4d] hover:bg-[#2e306a] text-white font-bold rounded-xl shadow-md transition transform hover:scale-105 text-sm">
              Explore Products →
            </button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-6xl space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className={`text-3xl sm:text-4xl text-[#2e306a] font-black ${londrina.className}`}>
            Your Wishlist ({wishlistState.items.length})
          </h1>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Manage your saved items and add available products to your cart.
          </p>
        </div>
        <Link
          href="/listing"
          className="text-xs font-bold text-[#2e306a] hover:underline hidden sm:inline-block"
        >
          Continue Shopping →
        </Link>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border-2 border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-100/80 border-b border-slate-200 text-left text-xs font-black uppercase tracking-wider text-slate-700">
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4 text-center">Stock Status</th>
              <th className="p-4 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {wishlistState.items.map((item) => {
              const outOfStock = isItemOutOfStock(item);
              const currentStock = stockInfo[item.id] ?? item.stock;

              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                      <Image
                        src={item.image || "/product/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/product/${item.id}`}
                        className="font-bold text-slate-900 text-sm hover:underline hover:text-[#00b8a2] transition line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <span className="text-[11px] text-slate-400 font-mono">ID: #{String(item.id).slice(-8)}</span>
                    </div>
                  </td>

                  <td className="p-4 font-bold text-slate-900 font-mono text-sm">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </td>

                  <td className="p-4 text-center">
                    {outOfStock ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-full">
                        <AlertCircle size={13} />
                        Out of Stock
                      </span>
                    ) : currentStock !== undefined && currentStock <= 5 ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold rounded-full animate-pulse">
                        Only {currentStock} left
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-full">
                        <CheckCircle2 size={13} />
                        In Stock
                      </span>
                    )}
                  </td>

                  <td className="p-4 text-right pr-6 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3">
                      {outOfStock ? (
                        <button
                          disabled
                          title="Product is currently out of stock"
                          className="bg-slate-100 text-slate-400 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold cursor-not-allowed"
                        >
                          Out of Stock
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="inline-flex items-center gap-1.5 bg-[#1e1e4d] hover:bg-[#2e306a] text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer"
                        >
                          <ShoppingCart size={14} />
                          <span>Add to Cart</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                        title="Remove from Wishlist"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {wishlistState.items.map((item) => {
          const outOfStock = isItemOutOfStock(item);
          const currentStock = stockInfo[item.id] ?? item.stock;

          return (
            <div
              key={item.id}
              className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex flex-col gap-3 shadow-xs"
            >
              <div className="flex gap-3 items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                  <Image
                    src={item.image || "/product/placeholder.svg"}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <Link
                    href={`/product/${item.id}`}
                    className="font-bold text-slate-900 text-sm hover:underline line-clamp-1"
                  >
                    {item.name}
                  </Link>
                  <p className="font-bold text-slate-900 font-mono text-sm">
                    ₹{Number(item.price).toLocaleString("en-IN")}
                  </p>
                  <div>
                    {outOfStock ? (
                      <span className="inline-block px-2.5 py-0.5 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold rounded-full">
                        Out of Stock
                      </span>
                    ) : currentStock !== undefined && currentStock <= 5 ? (
                      <span className="inline-block px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold rounded-full">
                        Only {currentStock} left
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold rounded-full">
                        In Stock
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                {outOfStock ? (
                  <button
                    disabled
                    className="bg-slate-100 text-slate-400 border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold cursor-not-allowed flex-1 mr-2"
                  >
                    Out of Stock
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-[#1e1e4d] hover:bg-[#2e306a] text-white px-4 py-2 rounded-xl text-xs font-bold transition flex-1 mr-2 shadow-xs"
                  >
                    Add to Cart
                  </button>
                )}
                <button
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition"
                  title="Remove from Wishlist"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
}
