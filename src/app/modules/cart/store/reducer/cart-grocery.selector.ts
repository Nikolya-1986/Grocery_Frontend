import { createSelector } from "@ngrx/store";
import { CartItem } from "../../model/cart-item.model";
import { CartFeatureState } from "./cart-grocery.state";

export const selectCartState = (state: CartFeatureState) => state;

export const selectCartItems = createSelector(
    selectCartState,
    (state: any | undefined) => {
        return state?.cartFeature?.cartItems;
    }
);

export const selectCartTotalPrice = createSelector(
    selectCartState,
    (state: any | undefined) => {
        return state.cartFeature?.cartItems.reduce((accumulator: number, cartItem: CartItem) => {
        return accumulator + (cartItem.countOfItems * cartItem.item.price);
        }, 0);
    }
);