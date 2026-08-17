export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface WishlistState {
  items: WishlistItem[];
}

export type WishlistAction =
   | { type: "ADD_TO_WISHLIST"; payload: WishlistItem }
   | { type: "REMOVE_FROM_WISHLIST"; payload: { id: string } }
   | { type: "SET_WISHLIST"; payload: WishlistItem[] }
   | { type: "CLEAR_WISHLIST" };
