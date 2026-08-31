"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  wishlistReducer,
  initialWishlistState,
} from "./wishlistReducer";
import { WishlistState, WishlistAction } from "./wishlistTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface WishlistContextType {
  wishlistState: WishlistState;
  wishlistDispatch: React.Dispatch<WishlistAction>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlistState, wishlistDispatch] = useReducer(
    wishlistReducer,
    initialWishlistState
  );
  const { data: session, status } = useSession();
  const router = useRouter();

  const userId = (session?.user as any)?.id || session?.user?.email || null;
  const lastUserIdRef = React.useRef<string | null>(null);
  const syncTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Fetch initial wishlist from backend ONLY once when user logs in or changes
  React.useEffect(() => {
    if (status === "authenticated" && userId) {
      if (lastUserIdRef.current === userId) return;
      lastUserIdRef.current = userId;

      fetch("/api/users/wishlist")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.wishlist)) {
            const formatted = data.wishlist.map((item: any) => ({
              id: item.productId || item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              stock: item.stock !== undefined ? item.stock : item.stockQuantity,
              stockQuantity: item.stockQuantity !== undefined ? item.stockQuantity : item.stock,
              isOutOfStock: item.isOutOfStock !== undefined ? item.isOutOfStock : ((item.stock !== undefined && item.stock <= 0) || (item.stockQuantity !== undefined && item.stockQuantity <= 0)),
            }));
            wishlistDispatch({ type: "SET_WISHLIST", payload: formatted });
          }
        })
        .catch((err) => {
          console.error("Failed to load wishlist:", err);
        });
    } else if (status === "unauthenticated") {
      if (lastUserIdRef.current !== null) {
        lastUserIdRef.current = null;
        wishlistDispatch({ type: "SET_WISHLIST", payload: [] });
      }
    }
  }, [status, userId]);

  // Debounced sync function
  const syncWishlistToBackend = (items: any[]) => {
    if (status !== "authenticated" || !userId) return;
    if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);

    syncTimeoutRef.current = setTimeout(() => {
      const wishlistItemsForBackend = items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        stock: item.stock,
        stockQuantity: item.stockQuantity,
        isOutOfStock: item.isOutOfStock
      }));

      fetch("/api/users/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlistItems: wishlistItemsForBackend }),
      }).catch((err) => console.error("Failed to sync wishlist:", err));
    }, 400);
  };

  const customWishlistDispatch = (action: any) => {
    if (action.type === "ADD_TO_WISHLIST") {
      if (!session?.user) {
        toast.warn("To continue shopping, please register your account.", {
          position: "top-center",
          autoClose: 3000,
        });
        router.push("/auth/signup");
        return;
      }
    }

    wishlistDispatch(action);

    if (["ADD_TO_WISHLIST", "REMOVE_FROM_WISHLIST", "CLEAR_WISHLIST"].includes(action.type)) {
      const nextState = wishlistReducer(wishlistState, action);
      syncWishlistToBackend(nextState.items);
    }
  };

  return (
    <WishlistContext.Provider value={{ wishlistState, wishlistDispatch: customWishlistDispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }
  return context;
};
