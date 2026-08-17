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
  const { data: session } = useSession();
  const router = useRouter();
  const isLocalChange = React.useRef(false);

  // Fetch initial wishlist from backend when session changes
  React.useEffect(() => {
    if (session?.user) {
      fetch("/api/users/wishlist")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.wishlist)) {
            const formatted = data.wishlist.map((item: any) => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
            }));
            wishlistDispatch({ type: "SET_WISHLIST", payload: formatted });
          }
        })
        .catch((err) => {
          console.error("Failed to load wishlist:", err);
        });
    } else {
      wishlistDispatch({ type: "SET_WISHLIST", payload: [] });
    }
  }, [session]);

  // Sync wishlist changes to database
  React.useEffect(() => {
    if (isLocalChange.current && session?.user) {
      isLocalChange.current = false;
      const wishlistItemsForBackend = wishlistState.items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      }));

      fetch("/api/users/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wishlistItems: wishlistItemsForBackend }),
      }).catch((err) => console.error("Failed to sync wishlist:", err));
    }
  }, [wishlistState.items, session]);

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

    if (["ADD_TO_WISHLIST", "REMOVE_FROM_WISHLIST", "CLEAR_WISHLIST"].includes(action.type)) {
      isLocalChange.current = true;
    }
    wishlistDispatch(action);
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
