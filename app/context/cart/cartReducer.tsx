import { CartState, CartAction } from "./cartTypes";

export const initialCartState: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
case "ADD_ITEM": {
  const index = state.items.findIndex(i => i.id === action.payload.id);

  if (index >= 0) {
    const updatedItems = [...state.items];
    updatedItems[index] = {
      ...updatedItems[index],
      quantity: updatedItems[index].quantity + action.payload.quantity,
    };
    return { items: updatedItems };
  }

  return { items: [...state.items, action.payload] };
}



    case "UPDATE_QUANTITY":
      return {
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "REMOVE_ITEM":
      return { items: state.items.filter(item => item.id !== action.payload) };

    case "SET_CART":
      return { items: action.payload };

    case "CLEAR_CART":
      return { items: [] };

    default:
      return state;
  }
}
