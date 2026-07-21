"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import {
  wishlistReducer,
  initialWishlistState,
} from "./wishlistReducer";
import { WishlistState, WishlistAction } from "./wishlistTypes";

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

  return (
    <WishlistContext.Provider value={{ wishlistState, wishlistDispatch }}>
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
