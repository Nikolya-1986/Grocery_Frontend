import { createSelector } from "@ngrx/store";
import { CatrGrocery } from "../../model/cart-grocery.model";
import { CartFeatureState } from "./cart-grocery.state";

export const selectCartState = (state: CartFeatureState) => state;

export const selectCartGrocery = createSelector(
    selectCartState,
    (state: CartFeatureState | any) => {
        return state?.cartFeature?.cartItems;
    }
);

export const selectCartTotalPrice = createSelector(
    selectCartState,
    (state: CartFeatureState | any) => {
        return state?.cartFeature?.cartItems.reduce((accumulator: number, cartItem: CatrGrocery) => {
            return (cartItem.countOfGrocery * cartItem.grocery.price) + accumulator;
        }, 0);
    }
);