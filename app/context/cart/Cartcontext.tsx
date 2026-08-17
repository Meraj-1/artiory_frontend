// CartContext.tsx
"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CartContextType} from "./cartTypes";
import { cartReducer, initialCartState } from "./cartReducer";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export type { CartItem } from "./cartTypes"
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCartState);
  const { data: session } = useSession();
  const router = useRouter();

  const cartItems = cart.items;

  const getCartTotal = () =>
    cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const customDispatch = (action: any) => {
    if (action.type === "ADD_ITEM") {
      if (!session?.user) {
        toast.warn("To continue shopping, please register your account.", {
          position: "top-center",
          autoClose: 3000,
        });
        router.push("/auth/signup");
        return;
      }
    }
    dispatch(action);
  };

  return (
    <CartContext.Provider value={{ cart, cartItems, getCartTotal, dispatch: customDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
