"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/cart/Cartcontext";
import Link from "next/link";
import { Londrina_Solid } from "next/font/google";
import { useSession } from "next-auth/react";

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
};

export default function CheckoutPage() {
  const { cartItems, getCartTotal } = useCart();
  const { data: session } = useSession();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "card",
  });

  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    if (session?.user) {
      // 1. Autofill profile name and email
      const nameParts = (session.user.name || "").trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";
      setForm((prev) => ({
        ...prev,
        firstName: prev.firstName || firstName,
        lastName: prev.lastName || lastName,
        email: prev.email || session.user.email || "",
        phone: prev.phone || (session.user as any).number || "",
      }));

      // 2. Fetch addresses
      fetch("/api/address")
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error("Failed to load addresses");
        })
        .then((json) => {
          setSavedAddresses(Array.isArray(json.data) ? json.data : []);
        })
        .catch((err) => console.error(err));
    }
  }, [session]);

  const handleSelectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
    if (!addressId) return;

    const selected = savedAddresses.find((addr) => addr._id === addressId);
    if (selected) {
      setForm((prev) => ({
        ...prev,
        address: selected.street || "",
        city: selected.city || "",
        state: selected.state || "",
        zip: selected.postalCode || "",
        phone: selected.phone || prev.phone || "",
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section className={`bg-white py-12 px-4 md:px-10 lg:px-00 xl:px-40 2xl:px-80 text-[#2e306a]`}>
      {/* Breadcrumb */}
        <p className={`${londrina.className} text-xl font-light mb-4 text-[#2e306a]`}>
        <Link
          href="/"
          className="hover:underline hover:text-[#00ba82] transition-all duration-300 ease-in-out"
        >
          Home /
        </Link>{" "}
        <span className="text-[#00ba82]">Checkout</span>
      </p>
      <h1 className={`${londrina.className} text-3xl font-bold mb-10`}>Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT SIDE - Form */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Delivery Info */}
          <div className="border border-gray-300 rounded-xl p-8 shadow-md">
            <h2 className={`${londrina.className} text-2xl font-semibold mb-6`}>Delivery Information</h2>
            
            {savedAddresses.length > 0 && (
              <div className="mb-6 bg-gray-50 border border-dashed border-gray-300 rounded-xl p-4">
                <label className="block text-sm font-semibold text-[#2e306a] mb-2">
                  Select a Saved Address
                </label>
                <select
                  value={selectedAddressId}
                  onChange={(e) => handleSelectAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 bg-white text-[#2e306a] focus:outline-none focus:ring focus:ring-gray-300 font-medium"
                >
                  <option value="">-- Choose from your saved addresses --</option>
                  {savedAddresses.map((addr) => (
                    <option key={addr._id} value={addr._id}>
                      {addr.type || addr.home || "Address"} - {addr.street}, {addr.city}, {addr.state} ({addr.phone})
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name *"
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Street Address *"
              className="border border-gray-300 rounded-lg p-3 w-full mt-4"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Town / City *"
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
              <input
                name="state"
                value={form.state}
                onChange={handleChange}
                placeholder="State *"
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                name="zip"
                value={form.zip}
                onChange={handleChange}
                placeholder="ZIP Code"
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border border-gray-300 rounded-lg p-3 w-full"
              />
            </div>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address*"
              className="border border-gray-300 rounded-lg p-3 w-full mt-4"
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Order Notes (optional)"
              className="border border-gray-300 rounded-lg p-3 w-full mt-4 h-24 resize-none"
            />
          </div>

          {/* Payment Section */}
          <div className="border border-gray-300  rounded-xl p-8 shadow-md">
            <h2 className={`${londrina.className} text-2xl font-semibold mb-4`}>Payment</h2>
            <p className="text-gray-500 mb-4">All transactions are secure and encrypted.</p>

            <div className="flex items-center gap-4 mb-4">
              <input
                type="radio"
                checked={form.paymentMethod === "card"}
                onChange={() => setForm({ ...form, paymentMethod: "card" })}
              />
              <span className="font-medium">Credit Card</span>
              <div className="flex gap-2 ml-2">
                <Image src="/visa.png" alt="Visa" width={36} height={24} />
                <Image src="/mastercard.png" alt="Mastercard" width={36} height={24} />
              </div>
            </div>

            {form.paymentMethod === "card" && (
              <div className="grid grid-cols-1 gap-4">
                <input placeholder="Card Number" className="border border-gray-300 rounded-lg p-3 w-full" />
                <input placeholder="Name on Card" className="border border-gray-300 rounded-lg p-3 w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="MM/YY" className="border border-gray-300 rounded-lg p-3 w-full" />
                  <input placeholder="CVC" className="border border-gray-300 rounded-lg p-3 w-full" />
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mt-4">
              <input type="checkbox" defaultChecked />
              <span className="text-sm">Use shipping address as billing address</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <input
                type="radio"
                checked={form.paymentMethod === "paypal"}
                onChange={() => setForm({ ...form, paymentMethod: "paypal" })}
              />
              <span className="font-medium">PayPal</span>
            </div>

            <button className="bg-[#00b8a2] text-white font-semibold rounded-lg w-full mt-6 py-3 hover:bg-[#009e8b] transition">
              Place Order
            </button>
          </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-3 shadow-md h-fit flex flex-col justify-between">
          <h2 className={`${londrina.className} text-2xl font-semibold mb-6`}>Your Order</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-sm">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border rounded-2xl border-gray-300 p-3"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium">&#8377;{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
          )}

          {/* Totals */}
          <div className="mt-6 border border-gray-300 rounded-2xl p-4 pt-4 space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>&#8377;{getCartTotal()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>&#8377;40.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>&#8377;{getCartTotal() + 40}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
