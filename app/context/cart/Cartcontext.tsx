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
  const [isLoaded, setIsLoaded] = React.useState(false);

  const cartItems = cart.items;

  const getCartTotal = () =>
    cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Fetch initial cart from backend when session changes
  React.useEffect(() => {
    if (session?.user) {
      fetch("/api/users/cart")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.cart)) {
            const formatted = data.cart.map((item: any) => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.quantity,
            }));
            dispatch({ type: "SET_CART", payload: formatted });
          }
          setIsLoaded(true);
        })
        .catch((err) => {
          console.error("Failed to load cart:", err);
          setIsLoaded(true);
        });
    } else {
      dispatch({ type: "SET_CART", payload: [] });
      setIsLoaded(true);
    }
  }, [session]);

  // Sync cart changes to database
  React.useEffect(() => {
    if (isLoaded && session?.user) {
      const cartItemsForBackend = cart.items.map((item) => ({
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      }));

      fetch("/api/users/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cartItemsForBackend }),
      }).catch((err) => console.error("Failed to sync cart:", err));
    }
  }, [cart.items, isLoaded, session]);

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
