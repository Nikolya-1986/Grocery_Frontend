import { createFeatureSelector, createSelector } from "@ngrx/store";

import { CartFeatureState } from "../../../modules/cart/store/reducer/cart-item.state";
import { ShellCartState } from "./shellCart.state";

export const SHELL_CART_STATE = 'shellCart';
const selectShellCartState = createFeatureSelector<ShellCartState>(SHELL_CART_STATE);

export const selectCartOpen = createSelector(
    selectShellCartState,
    (state: ShellCartState) => ({
        cartOpen: state.cartOpen
    })
);

export const CART_FEATURE_STATE = 'cartFeature';
const selectCartFeature = createFeatureSelector<CartFeatureState>(CART_FEATURE_STATE);

export const selectCountOfCartItems = createSelector(
    selectCartFeature,
    (state: CartFeatureState) => state.countOfItems
);