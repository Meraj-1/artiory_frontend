import { WishlistState, WishlistAction } from "./wishlistTypes";

export const initialWishlistState: WishlistState = {
  items: [],
};

export const wishlistReducer = (
  state: WishlistState,
  action: WishlistAction
): WishlistState => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.items.find((item) => item.id === action.payload.id)) {
        return state; // avoid duplicates
      }
      return { ...state, items: [...state.items, action.payload] };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case "CLEAR_WISHLIST":
      return { ...state, items: [] };

    default:
      return state;
  }
};

