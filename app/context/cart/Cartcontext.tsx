// CartContext.tsx
"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartContextType} from "./cartTypes";
import { cartReducer, initialCartState } from "./cartReducer";

export type { CartItem } from "./cartTypes"
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);

  const cartItems = cart.items;

  const getCartTotal = () =>
    cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartItems, getCartTotal, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
