"use client";

import { CartProvider } from "../context/cart/Cartcontext";
import { WishlistProvider } from "../context/whishlist/WishlistContext";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <WishlistProvider>{children}</WishlistProvider>
    </CartProvider>
  );
}
