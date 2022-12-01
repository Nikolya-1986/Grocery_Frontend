import { CatrGrocery } from "../../model/cart-grocery.model";

export interface CartFeatureState {
    cartItems: CatrGrocery[],
    countOfGrocery: number,
};

export const initialCartState: CartFeatureState = {
    cartItems: [],
    countOfGrocery: 0
};

export interface DegaultCartState {
    cartGrocery: CartFeatureState
};