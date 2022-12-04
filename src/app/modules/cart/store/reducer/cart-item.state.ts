import { CartItem } from "../../model/cart-item.model";

export interface CartFeatureState {
    cartItems: CartItem[],
    countOfItems: number
  }

export const initialCartState: CartFeatureState = {
    cartItems: [],
    countOfItems: 0
};

export interface DegaultCartState {
    cartGrocery: CartFeatureState
};