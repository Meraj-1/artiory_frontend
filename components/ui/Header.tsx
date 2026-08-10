"use client";

import React, { useRef, useReducer, useState } from "react";
import Image from "next/image";
import { Londrina_Solid } from "next/font/google";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ProfileIcon from "../icons/ProfileIcon";
import { useCart } from "@/app/context/cart/Cartcontext";
import { useWishlist } from "@/app/context/whishlist/WishlistContext";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import ProfileModal from "./ProfileModal";

type CartItem = {
  id: string;
  name: string;
  quantity: number;
};

const londrina = Londrina_Solid({
  weight: ["100", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
});

const Header: React.FC = () => {
  const { data: session } = useSession();
  const { wishlistState } = useWishlist();
  const { cart } = useCart();

  const menuOpenRef = useRef<boolean>(false);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [hoverOpen, setHoverOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const toggleMenu = () => {
    menuOpenRef.current = !menuOpenRef.current;
    forceUpdate();
  };
  const closeMenu = () => {
    menuOpenRef.current = false;
    forceUpdate();
  };

  // Toggle ?account=true on/off
  const toggleAccountQuery = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (params.has("account")) {
      params.delete("account");
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.push(newUrl);
    } else {
      params.set("account", "true");
      router.push(`${pathname}?${params.toString()}`);
    }
  };

  const closeAccountModal = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    if (params.has("account")) {
      params.delete("account");
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      router.push(newUrl);
    }
  };

  const onSignOut = async () => {
    // optional: pass callbackUrl
    await signOut({ callbackUrl: "/" });
  };

  // session.user shape: { name, email, image, id? }
  type User = {
    name?: string;
    email?: string;
    image?: string;
    id?: string;
  };
  const user = session?.user as User | undefined;

  return (
    <>
      <header className="p-1 sticky top-0 bg-white z-50">
        {menuOpenRef.current && (
          <div
            className="fixed inset-0 bg-black/70 z-40 transition-opacity duration-500"
            onClick={closeMenu}
          />
        )}

        <div className="flex items-center justify-between md:justify-between lg:justify-around transition-all duration-300 ease-in-out">
          <div className="flex md:hidden gap-4 items-center">
            <button
              className={`${menuOpenRef.current ? "absolute left-[82%] z-50 text-white" : ""
                }`}
              onClick={toggleMenu}
            >
              {menuOpenRef.current ? <X size={28} /> : <Menu size={28} />}
            </button>

            {/* <button onClick={() => console.log("search clicked")}>
              <Image
                src="/search-icon.svg"
                className="w-6 md:w-7 cursor-pointer"
                alt="search"
                width={25}
                height={20}
              />
            </button> */}
          </div>

          <div className="flex justify-center flex-1 md:flex-none">
            <Link href="/">
              <Image
                width={100}
                height={50}
                className="h-auto w-30 lg:w-30 cursor-pointer"
                src="/Artiory-Logo.svg"
                alt="logo"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className={`${londrina.className} hidden md:block mt-1`}>
            <ul className="flex gap-10 font-bold justify-center">
              {["HOME", "ABOUT US", "PRODUCTS", "CONTACT US"].map((text, i) => {
                const hrefs = ["/", "/about", "/listing", "/contact"];
                return (
                  <li
                    key={text}
                    className="text-xl font-medium lg:text-2xl text-[#2e306a] cursor-pointer hover:text-[#00b8a2] transition-all duration-300 ease-in-out"
                  >
                    <Link href={hrefs[i]}>{text}</Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Icons */}
          <div className="flex gap-4 md:gap-6 items-center">
            {/* Wishlist */}
            <Link href="/wish" className="relative">
              <Image
                src="/Like-icon.svg"
                className="w-6 md:w-7 cursor-pointer"
                alt="like"
                width={25}
                height={20}
              />
              {wishlistState?.items?.length > 0 && (
                <div
                  className="absolute -top-2 -right-1 w-5 h-5 rounded-full flex items-center justify-center 
                bg-gradient-to-br from-[#3a3d8a] via-[#2e306a] to-[#232455]
                text-xs text-white font-bold
                shadow-md
                overflow-hidden"
                >
                  <span className="relative z-10">
                    {wishlistState.items.length}
                  </span>
                  {/* Highlight spot to create 3D effect */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white/20 rounded-full transform -translate-x-0.5 -translate-y-0.5"></div>
                  {/* Bottom shadow */}
                  <div className="absolute bottom-0 right-0 w-3 h-2 bg-black/20 rounded-full"></div>
                </div>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative inline-block">
              <Image
                src="/cart-icon.svg"
                alt="cart"
                width={30}
                height={30}
                className="cursor-pointer h-auto w-6 md:w-7"
              />
              {cart?.items?.length > 0 && (
                <div
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center 
    bg-gradient-to-br from-[#3a3d8a] via-[#2e306a] to-[#232455]
    text-xs text-white font-bold
    shadow-md
    overflow-hidden"
                >
                  <span className="relative z-10">
                    {cart.items.reduce(
                      (total: number, item: CartItem) => total + item.quantity,
                      0
                    )}
                  </span>
                  {/* Highlight spot to create 3D effect */}
                  <div className="absolute top-0 left-0 w-2 h-2 bg-white/20 rounded-full transform -translate-x-0.5 -translate-y-0.5"></div>
                  {/* Bottom shadow */}
                  <div className="absolute bottom-0 right-0 w-3 h-2 bg-black/20 rounded-full"></div>
                </div>
              )}
            </Link>

            {/* Profile / Login (changed behaviour) */}
            {user ? (
              <div
                className="relative"
              onMouseEnter={() => setHoverOpen(true)}
              onMouseLeave={() => setHoverOpen(false)}
              >
                <button
                  onClick={toggleAccountQuery}
                  aria-label="Open account modal"
                  className="flex items-center gap-2 group cursor-pointer"
                >
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? "avatar"}
                      width={36}
                      unoptimized
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                      {(user.name || "U").charAt(0)}
                    </div>
                  )}
                  <span
                    className={`${londrina.className} text-lg text-[#2e306a] hidden md:inline-block`}
                  >
                    {user.name ?? "Account"}
                  </span>
                </button>

                {/* Hover dropdown */}
                {hoverOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50 p-3 text-sm">
                    <div className="font-medium">{user.name}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {user.email}
                    </div>
                    <hr className="my-2" />
                    <button
                      onClick={() => {
                        toggleAccountQuery();
                      }}
                      className="w-full text-left py-1 text-sm hover:text-[#00b8a2]"
                    >
                      View profile
                    </button>
                    <button
                      onClick={onSignOut}
                      className="w-full text-left py-1 text-sm text-red-600 hover:text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex gap-2 items-center group cursor-pointer"
              >
                <span
                  className={`${londrina.className} text-lg text-[#2e306a] group-hover:text-[#00b8a2]`}
                >
                  Login
                </span>
                <ProfileIcon className="w-8 h-8 text-[#2e306a] group-hover:text-[#00b8a2]" />
              </Link>
            )}
          </div>
        </div>

        {/* ====== MOBILE MENU (unchanged) ====== */}
        <nav
          className={`${londrina.className
            } absolute top-0 left-0 w-[80%] h-[100vh] bg-white shadow-lg p-5 md:hidden z-50 transform transition-all duration-500 ease-in-out ${menuOpenRef.current
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-5 pointer-events-none"
            }`}
        >
          <ul className="flex h-22 absolute top-0 left-0 w-full bg-[#00b8a2] justify-between p-4 items-center">
            <li className="flex gap-2 w-full items-center">
              <ProfileIcon className="w-8 h-8 text-white" />
              <span className="text-white">LOGIN & SIGNUP</span>
            </li>
            <Link href="/">
              <Image
                width={100}
                height={50}
                className="h-auto w-30 lg:w-40 cursor-pointer"
                src="/Artiory-Logo.svg"
                alt="logo"
              />
            </Link>
          </ul>
          <ul className="flex mt-24 flex-col gap-6">
            <li onClick={closeMenu}>
              <Link href="/about" className="hover:text-[#00b8a2]">
                ABOUT US
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/listing" className="hover:text-[#00b8a2]">
                PRODUCTS
              </Link>
            </li>
            <li onClick={closeMenu}>
              <Link href="/contact" className="hover:text-[#00b8a2]">
                CONTACT US
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Profile Modal — open when URL contains ?account=true */}
      {searchParams?.has("account") && (
        <ProfileModal onClose={closeAccountModal} />
      )}
    </>
  );
};

export default Header;
