"use client";

import React, { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import {
  X,
  LogOut,
  Mail,
  User,
  Link as LinkIcon,
  Phone,
  Venus,
  Unlink,
  Loader2,
  BaggageClaim,
  Heart,
  MapPin,
  Trash2,
  Settings2,
} from "lucide-react";
import LinkGoogleButton from "@/components/auth/LinkGoogleButton";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import { useCart } from "@/app/context/cart/Cartcontext";

type Props = { onClose: () => void };

interface Address {
  _id?: string;
  type: string;
  home: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export default function ProfileModal({ onClose }: Props) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<{ id?: string; name?: string | null; email?: string | null; image?: string | null; number?: string | null; gender?: string | null } | null>(null);
  const [providerLoading, setProviderLoading] = useState(true);
  const [googleLinked, setGoogleLinked] = useState(false);
  const [hasPassword, setHasPassword] = useState<boolean | null>(null);
  const { wishlistState, wishlistDispatch } = useWishlist();
  const { dispatch: cartDispatch } = useCart();
  const [activeSection, setActiveSection] = useState("profile");

  const [editablePhone, setEditablePhone] = useState("");
  const [editableGender, setEditableGender] = useState("");

  const [address, setAddress] = useState<Address>({
    type: "Home",
    home: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoading, setAddressesLoading] = useState(false);

  const fetchAddresses = async () => {
    setAddressesLoading(true);
    try {
      const res = await fetch("/api/address");
      if (res.ok) {
        const json = await res.json();
        const list = Array.isArray(json.data) ? json.data : [];
        const mapped = list.map((addr: any) => ({
          _id: addr._id,
          type: addr.type || "Home",
          home: addr.home || "",
          street: addr.street || "",
          city: addr.city || "",
          state: addr.state || "",
          postalCode: addr.postalCode || "",
          country: addr.country || "",
          phone: addr.phone || "",
        }));
        setAddresses(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch addresses:", err);
    } finally {
      setAddressesLoading(false);
    }
  };

  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json)) {
          setOrders(json);
        } else if (json && Array.isArray(json.data)) {
          setOrders(json.data);
        } else {
          setOrders([]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch customer orders:", err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      if (activeSection === "address") {
        fetchAddresses();
      } else if (activeSection === "orders") {
        fetchOrders();
      }
    }
  }, [session, activeSection]);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const res = await fetch("/api/account/profile");
        if (res.ok) {
          const json = await res.json();
          setProfile(json.user ?? session?.user ?? null);
          setEditablePhone(json.user?.number || "");
          setEditableGender(json.user?.gender || "");
          setHasPassword(json.user?.hasPassword ?? true); // Default to true if not specified
        } else {
          setProfile(session?.user ?? null);
          setEditablePhone(session?.user?.number || "");
          setEditableGender(session?.user?.gender || "");
          setHasPassword(true); // Default to true if profile fetch fails
        }
      } catch {
        setProfile(session?.user ?? null);
        setEditablePhone(session?.user?.number || "");
        setEditableGender(session?.user?.gender || "");
        setHasPassword(true); // Default to true on error
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [session]);

  useEffect(() => {
    async function fetchProviders() {
      setProviderLoading(true);
      try {
        const res = await fetch("/api/account/providers");
        if (res.ok) {
          const json = await res.json();
          setGoogleLinked(Boolean(json.google));
        } else {
          setGoogleLinked(false);
        }
      } catch {
        setGoogleLinked(false);
      } finally {
        setProviderLoading(false);
      }
    }
    if (session?.user) fetchProviders();
  }, [session]);

  if (!session?.user) return null;
  const user = profile ?? session.user;

  // -------------------- Handlers --------------------
  const handleUnlinkGoogle = async () => {
    // Show confirmation dialog with more detailed message
    const confirmUnlink = confirm(
      "Are you sure you want to unlink your Google account?\n\n" +
      "⚠️ This will:\n" +
      "• Remove Google as a login option\n" +
      "• Require you to use email/password to sign in\n" +
      "• Cannot be undone automatically\n\n" +
      "Click OK to proceed or Cancel to keep your Google account linked."
    );
    
    if (!confirmUnlink) return;

    try {
      const res = await fetch("/api/auth/unlink/google", { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.error || "Failed to unlink Google account", { autoClose: 3000 });
        return;
      }
      toast.success("Google account unlinked successfully!", { autoClose: 2000 });
      setGoogleLinked(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to unlink Google account. Please try again.", { autoClose: 3000 });
    }
  };

  const handleAddAddress = async () => {
    if (
      !address.home ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.postalCode ||
      !address.country ||
      !address.phone
    ) {
      toast.error("Please fill all fields.", { autoClose: 700 });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: address.type,
          home: address.home,
          street: address.street,
          city: address.city,
          state: address.state,
          postalCode: address.postalCode,
          country: address.country,
          phone: address.phone,
        }),
      });

      if (res.ok) {
        toast.success("Address added successfully!", { autoClose: 700 });
        setAddress({
          type: "Home",
          home: "",
          street: "",
          city: "",
          state: "",
          postalCode: "",
          country: "",
          phone: "",
        });
        fetchAddresses();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to add address", { autoClose: 700 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add address", { autoClose: 700 });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      setLoading(true);
      const res = await fetch(`/api/address/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Address deleted successfully!", { autoClose: 700 });
        fetchAddresses();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Failed to delete address", { autoClose: 700 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete address", { autoClose: 700 });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromWishlist = (id: string) => {
    wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: { id } });
    toast.success("Item removed from wishlist!", { autoClose: 700 });
  };

  const handleAddToCart = (item: { id: string | number; name: string; image: string; price: number; [key: string]: unknown }) => {
    cartDispatch({
      type: "ADD_ITEM",
      payload: { ...item, id: String(item.id), quantity: 1 },
    });
    toast.success("Item added to cart!", { autoClose: 700 });
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/account/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          number: editablePhone,
          gender: editableGender,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success("Profile updated successfully!", { autoClose: 700 });
        // Update the local profile state with the returned user data
        setProfile(data.user);
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to update profile", { autoClose: 700 });
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile", { autoClose: 700 });
    } finally {
      setLoading(false);
    }
  };

  // -------------------- Section Render --------------------
  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <div className="bg-gradient-to-br from-[#f6f7ff] to-[#eaeaff]  p-5 shadow-sm h-full flex flex-col justify-between">
            <div className="space-y-5">
              {/* Full Name */}
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <div className="flex items-center gap-2 text-[#1e1e4d] ">
                  <User size={18} /> Full Name
                </div>
                <p className="font-semibold text-[#1e1e4d] ">{user.name || "—"}</p>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <div className="flex items-center gap-2 text-[#1e1e4d] ">
                  <Mail size={18} /> Email
                </div>
                <p className="font-semibold text-[#1e1e4d] ">{user.email || "—"}</p>
              </div>

              {/* Phone */}
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <div className="flex items-center gap-2 text-[#1e1e4d] ">
                  <Phone size={18} /> Phone
                </div>
                <input
                  type="text"
                  value={editablePhone}
                  onChange={(e) => setEditablePhone(e.target.value)}
                  placeholder="91+xxxxxxxxxx"
                  className="font-semibold text-[#1e1e4d]  bg-transparent outline-none text-right w-[160px]"
                />
              </div>

              {/* Gender */}
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <div className="flex items-center gap-2 text-[#1e1e4d] ">
                  <Venus size={18} /> Gender
                </div>
                <select
                  value={editableGender}
                  onChange={(e) => setEditableGender(e.target.value)}
                  className="text-[#1e1e4d] cursor-po  bg-transparent outline-none text-right font-semibold"
                >
                  <option className="bg-[#1e1e4d] text-white font-medium cursor-pointer" value="male">Male</option>
                  <option className="bg-[#1e1e4d] text-white font-medium cursor-pointer" value="female">Female</option>
                  <option className="bg-[#1e1e4d] text-white font-medium cursor-pointer" value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="bg-[#1e1e4d] hover:bg-[#3b3b7a] cursor-pointer transition-all ease-in-out duration-500 text-white font-medium px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>

            <ToastContainer />
          </div>
        );

      case "wishlist":
        return (
          <div className="h-full bg-gradient-to-br from-[#f6f7ff] to-[#eaeaff] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1e1e4d]  mb-6 flex items-center gap-2">
                My Wishlist
            </h2>
            {wishlistState.items.length === 0 ? (
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
            ) : (
              <>
                <div className="hidden md:block">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b  text-left text-[#1e1e4d] ">
                        <th className="p-3">Product</th>
                        <th className="p-3">Price</th>
                        <th className="p-3 text-center transform -translate-x-9">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistState.items.map((item: { id: string; name: string; price: number; image: string }) => (
                        <tr key={item.id} className="border-b dark:border-gray-700">
                          <td className="p-3 flex items-center gap-3">
                            <Image src={item.image} alt={item.name} width={70} height={70} className="rounded h-auto w-22" />
                            <span className="text-[#1e1e4d] ">{item.name}</span>
                          </td>
                          <td className="p-3 text-[#1e1e4d] ">₹{item.price}</td>
                          <td className="p-3 whitespace-nowrap">
                            <div className="flex items-center space-x-2 justify-center">
                              <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-blue-600 cursor-pointer  transition-all duration-500 ease-in-out font-light text-sm  text-white px-3 py-1 rounded hover:bg-blue-700"
                              >
                                Add to Cart
                              </button>
                              <button
                                onClick={() => handleRemoveFromWishlist(item.id)}
                                className="text-red-500 cursor-pointer transition-all ease-in-out duration-300 hover:text-red-700"
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
                  {wishlistState.items.map((item: { id: string; name: string; price: number; image: string }) => (
                    <div key={item.id} className="border dark:border-gray-700 rounded-lg p-4 flex flex-col gap-3 bg-white/5">
                      <div className="flex gap-3 items-center">
                        <Image src={item.image} alt={item.name} width={60} height={60} className="rounded" />
                        <div>
                          <p className="font-semibold text-[#1e1e4d] dark:text-gray-100">{item.name}</p>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">₹{item.price}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <button onClick={() => handleAddToCart(item)} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                          Add to Cart
                        </button>
                        <button onClick={() => handleRemoveFromWishlist(item.id)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
            <ToastContainer />
          </div>
        );

      case "address":
        return (
          <div className="p-4 bg-white rounded-lg shadow text-gray-700 overflow-y-auto max-h-[80vh]">
            <h2 className="text-xl font-bold text-[#1e1e4d] mb-4">My Addresses</h2>
            
            {addressesLoading ? (
              <div className="flex justify-center items-center py-8 text-gray-500">
                <Loader2 className="animate-spin mr-2" size={18} />
                Loading addresses...
              </div>
            ) : addresses.length === 0 ? (
              <p className="text-sm text-gray-500 mb-4">You have not added any addresses yet.</p>
            ) : (
              <ul className="mb-6 space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {addresses.map((addr, index) => (
                  <li key={addr._id || index} className="p-3 border rounded-md text-sm text-gray-700 bg-gray-50 flex justify-between items-center">
                    <div>
                      <strong className="text-[#1e1e4d]">{addr.type}:</strong> {addr.home}, {addr.street}, {addr.city}, {addr.state} - {addr.postalCode}, {addr.country} ({addr.phone})
                    </div>
                    {addr._id && (
                      <button
                        onClick={() => handleDeleteAddress(addr._id!)}
                        className="text-red-500 hover:text-red-700 transition cursor-pointer p-1 ml-2 flex-shrink-0"
                        title="Delete Address"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t pt-4 space-y-3">
              <h3 className="text-sm font-semibold text-gray-600 mb-1">Add New Address</h3>
              
              <select name="type" value={address.type} onChange={(e) => setAddress({ ...address, type: e.target.value })} className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#1e1e4d] focus:outline-none focus:ring focus:ring-gray-300">
                <option className="bg-[#1e1e4d] text-white">Home</option>
                <option className="bg-[#1e1e4d] text-white">Work</option>
                <option className="bg-[#1e1e4d] text-white">Other</option>
              </select>
              {["home", "street", "city", "state", "postalCode", "country", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={
                    field === "home" ? "Flat / House No / Building Name *" :
                    field === "street" ? "Street Address / Colony *" :
                    field === "postalCode" ? "Postal Code / Zip *" :
                    field.charAt(0).toUpperCase() + field.slice(1) + " *"
                  }
                  value={address[field as keyof Address] || ""}
                  onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                  className="w-full border text-black border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-gray-300"
                />
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={handleAddAddress} className="w-1/2 bg-[#1e1e4d] hover:bg-[#3b3b7a] transition cursor-pointer text-white py-2 rounded-md font-medium">Add Address</button>
                <button onClick={() => setAddress({ type: "Home", home: "", street: "", city: "", state: "", postalCode: "", country: "", phone: "" })} className="w-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 transition cursor-pointer py-2 rounded-md font-medium">Cancel</button>
              </div>
            </div>
            <ToastContainer />
          </div>
        );

      case "orders":
        return (
          <div className="h-full bg-gradient-to-br from-[#f6f7ff] to-[#eaeaff] p-6 shadow-sm overflow-y-auto max-h-[80vh]">
            <h2 className="text-2xl font-bold text-[#1e1e4d] mb-6 flex items-center gap-2">
              <BaggageClaim size={24} /> My Orders
            </h2>

            {ordersLoading ? (
              <div className="flex justify-center items-center py-20 text-[#1e1e4d]">
                <Loader2 className="animate-spin mr-2" size={24} />
                Loading orders...
              </div>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <BaggageClaim size={50} className="text-[#1e1e4d]" />
                <p className="text-xl font-semibold text-[#1e1e4d] mt-4 mb-2">
                  You have no orders yet
                </p>
                <p className="text-gray-600 mb-5">
                  Start shopping and your orders will appear here.
                </p>
                <Link href="/listing">
                  <button onClick={onClose} className="px-6 py-2 cursor-pointer transition-all duration-300 bg-[#1e1e4d] text-white rounded-xl shadow-md hover:bg-[#5b5ba1] hover:scale-105">
                    Browse Products
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order: any) => (
                  <div key={order._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 text-gray-700">
                    <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-4">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold">Order ID</p>
                        <p className="text-sm font-mono font-bold text-[#1e1e4d]">{order._id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 font-semibold">Status</p>
                        <span className={`inline-block px-2.5 py-1 text-xs font-bold rounded-full ${
                          order.status === "Paid" ? "bg-emerald-100 text-emerald-800" :
                          order.status === "Delivered" ? "bg-blue-100 text-blue-800" :
                          order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                          "bg-amber-100 text-amber-800"
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {order.orderItems.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="font-medium">{item.name} <span className="text-xs text-gray-500">x{item.qty}</span></span>
                          <span className="font-semibold text-[#1e1e4d]">₹{item.price * item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-4 text-sm">
                      <div>
                        {order.awbNumber && (
                          <p className="text-xs text-gray-500">
                            Tracking ID: <span className="font-mono text-gray-700 font-bold">{order.awbNumber}</span> ({order.courierName})
                          </p>
                        )}
                      </div>
                      <p className="text-base font-bold text-[#1e1e4d]">
                        Total: ₹{order.totalPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "settings":
        return (
          <div className="bg-gradient-to-br from-[#f6f7ff] to-[#eaeaff] p-5 shadow-sm h-full">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1e1e4d] mb-6">Account Settings</h2>

              {/* Sign-In Methods Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1e1e4d] mb-4 flex items-center gap-2">
                  <LinkIcon size={20} />
                  Sign-In Methods
                </h3>
                
                <div className="space-y-3">
                  {/* Email/Password Login */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Mail size={18} className="text-[#1e1e4d]" />
                      <div>
                        <p className="font-medium text-[#1e1e4d]">Email & Password</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    {/* Dynamic password action based on whether user has password */}
                    <button className="text-[#1e1e4d] hover:text-[#3b3b7a] text-sm font-medium px-3 py-1 rounded border border-gray-300 hover:border-gray-400 transition-all">
                      {hasPassword ? "Change Password" : "Create Password"}
                    </button>
                  </div>

                  {/* Google Account */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center gap-3">
                      <Image 
                        src="https://cdn-icons-png.flaticon.com/128/281/281764.png" 
                        alt="Google"
                        width={30}
                        height={30}
                        className="w-5 h-5"
                      />
                      <div>
                        <p className="font-medium text-[#1e1e4d]">Google Account</p>
                        <p className="text-sm text-gray-600">
                          {providerLoading ? "Checking..." : googleLinked ? "Connected" : "Not connected"}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {providerLoading ? (
                        <Loader2 className="animate-spin text-gray-400" size={16} />
                      ) : googleLinked ? (
                        <button
                          onClick={handleUnlinkGoogle}
                          className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded border border-red-200 hover:border-red-300 transition-all"
                        >
                          <><Unlink className="inline-block" size={12}/> Unlink</>
                        </button>
                      ) : (
                        <div className="flex justify-center">
                          <LinkGoogleButton onSuccess={() => setGoogleLinked(true)} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-[#1e1e4d] mb-4 flex items-center gap-2">
                  <User size={20} />
                  Security
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div>
                      <p className="font-medium text-[#1e1e4d]">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <span className="text-gray-500 text-sm font-medium px-3 py-1 rounded border border-gray-200">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
            
            <ToastContainer />
          </div>
        );
    }
  };

  // -------------------- JSX --------------------
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 text-white z-50 bg-black/70 flex items-center justify-center"
      >
        <motion.div
          initial={{ y: "100%", x: 0 }}
          animate={{ y: 0, x: 0 }}
          exit={{ y: "100%", x: 0 }}
          transition={{ type: "tween", duration: 0.5 }}
          className="bg-white flex flex-col md:flex-row w-full h-full md:w-[800px] md:h-[90vh] md:max-h-[800px] overflow-hidden md:rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Panel */}
          <div className="bg-[linear-gradient(90deg,#1e1e4d,#3b3b7a)] w-full md:w-1/3 p-4 md:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-xl font-bold">My Account</h2>
                <button onClick={onClose} className="transition-transform cursor-pointer duration-300 hover:rotate-90">
                  <X size={22} />
                </button>
              </div>
              <div className="mt-5 flex flex-col items-center text-center">
                {user.image ? (
                  <Image src={user.image} width={80} height={80} alt={`Profile Picture of ${user.name}`} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-white/30" unoptimized />
                ) : (
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/30 flex items-center justify-center text-lg md:text-2xl font-bold uppercase">{(user.name || "U").charAt(0)}</div>
                )}
                <h3 className="mt-2 text-base md:text-lg font-medium">{user.name}</h3>
                <p className="text-xs md:text-sm">{user.email}</p>
              </div>

              <div className="mt-5  md:mt-9 grid grid-cols-2 md:grid-cols-1 gap-3">
                {[
                  { key: "profile", label: "View Profile", icon: <User size={18} /> },
                  { key: "orders", label: "My Orders", icon: <BaggageClaim size={18} /> },
                  { key: "wishlist", label: "My Wishlist", icon: <Heart size={18} /> },
                  { key: "address", label: "My Addresses", icon: <MapPin size={18} /> },
                  { key: "settings", label: "Account Settings", icon: <Settings2 size={18} /> },
                ].map((btn) => (
                  <button key={btn.key} onClick={() => setActiveSection(btn.key)} className="flex cursor-pointer items-center justify-center gap-2 px-4 py-3 w-full rounded-lg bg-white/5 hover:bg-white/10 transition font-medium text-sm">
                    {btn.icon}
                    <span>{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={async () => await signOut({ callbackUrl: "/" })} className="flex items-center justify-center gap-2 bg-black text-white hover:bg-black/100 cursor-pointer font-medium py-2 rounded-md text-sm md:text-md transition mt-6">
              <LogOut size={18} /> Sign Out
            </button>
          </div>

          {/* Right Panel */}
          <div className="flex-1 p-2 md:p-0 overflow-y-auto max-h-[80vh] md:max-h-none">{renderSection()}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
