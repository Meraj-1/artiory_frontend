"use client";
import { CartItem, useCart } from "@/app/context/cart/Cartcontext";
import { Trash, Plus, Minus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Londrina_Solid } from "next/font/google";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

export default function CartPage() {
  const { cart, dispatch } = useCart(); 

  const handleIncrement = (id: string) => {
    const item = cart.items.find((i) => i.id === id);
    if (!item) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: item.quantity + 1 } });
  };

  const handleDecrement = (id: string) => {
    const item = cart.items.find((i) => i.id === id);
    if (!item) return;
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: Math.max(item.quantity - 1, 1) } });
  };

  const totalAmount = cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <p className={`${londrina.className} text-xl font-light mb-4 text-[#2e306a]`}>
        <Link
          href="/"
          className="hover:underline hover:text-[#00ba82] transition-all duration-300 ease-in-out"
        >
          Home /
        </Link>{" "}
        <span className="text-[#00ba82]">Your Shopping Cart</span>
      </p>

      <h2 className={`${londrina.className} text-4xl text-[#2e306a] mb-6`}>Your Cart</h2>

      {cart.items.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#EAEAEA] text-left">
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map((item) => (
                  <tr key={item.id} className="border-b">
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
                    <td className="p-3">
                      <div className="flex items-center border rounded-md overflow-hidden w-fit">
                        <button
                          className="px-2 py-1 border-r hover:bg-gray-100"
                          onClick={() => handleDecrement(item.id)}
                        >
                          <Minus size={20} />
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border-l hover:bg-gray-100"
                          onClick={() => handleIncrement(item.id)}
                        >
                          <Plus size={20} />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 font-medium">&#x20B9;{item.price * item.quantity}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="border rounded-lg p-4 flex flex-col gap-3">
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
                    <p className="text-gray-600 text-sm">
                      &#x20B9;{item.price} | SKU: BR-00{item.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      className="px-3 py-1 border-r hover:bg-gray-100"
                      onClick={() => handleDecrement(item.id)}
                    >
                      <Minus size={18} />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="px-3 py-1 border-l hover:bg-gray-100"
                      onClick={() => handleIncrement(item.id)}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <p className="font-medium">&#x20B9;{item.price * item.quantity}</p>
                  <button
                    onClick={() => dispatch({ type: "REMOVE_ITEM", payload: item.id })}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="flex flex-col md:flex-row md:justify-between gap-6 mt-8">
            <div className="flex gap-2 h-10 w-full md:w-1/3">
              <input
                type="text"
                placeholder="Coupon code"
                className="border px-3 py-2 rounded w-full"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Apply
              </button>
            </div>

            <div className="border rounded-lg p-5 w-full md:w-1/3">
              <h3 className="text-lg font-semibold mb-4">Cart Total</h3>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span className="font-medium">&#x20B9;{totalAmount}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-bold text-lg">&#x20B9;{totalAmount}</span>
              </div>
              <button className="bg-[#FFE926] w-full py-3 rounded text-[#1e1e4d] font-semibold cursor-pointer">
                <Link href="/checkout">Proceed to checkout</Link>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
