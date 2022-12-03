import { createReducer, on } from "@ngrx/store";

import { groceriesPageActions } from "../../../../modules/home/store/actions/grocery-page.actions";
import { CartItem } from "../../model/cart-item.model";
import { cartPageActions } from "../actions/cart-page.actions";
import { CartFeatureState, initialCartState } from "./cart-grocery.state";

const getNumberOfItems = (cartItems: CartItem[]): number => {
    return cartItems.reduce((partialSum, cartItem) => partialSum + cartItem.countOfItems, 0);
};

  export const cartReducer = createReducer(
    initialCartState,
    on(groceriesPageActions.addGroceryToCart, (store: CartFeatureState, result) => {
        const existingItem = store.cartItems.find((cartItem) => cartItem.item.id === result.grocery.id);
            return {
                ...store,
                cartItems: store.cartItems.map((cartItem) => cartItem.item.id !== result.grocery.id
                    ? cartItem
                    : {...cartItem, countOfItems: cartItem.countOfItems + 1}
                ).concat(existingItem ? [] : [{ countOfItems: 1, item: result.grocery}]),
                countOfItems: store.countOfItems + 1
            }
        }
    ),

    on(cartPageActions.reduceNumberOfItemInCart, (store: CartFeatureState, result) => {
        return {
            ...store,
            cartItems: store.cartItems.map((cartItem) => cartItem.item.id !== result.cartItem.item.id
                ? cartItem : { ...cartItem, countOfItems: cartItem.countOfItems - 1 }
            ).filter(({ countOfItems }) => countOfItems > 0),
            countOfItems: store.countOfItems - 1
        }
    }),

    on(cartPageActions.increaseNumberOfItemInCart, (store: CartFeatureState, result) => {
        return {
            ...store,
            cartItems: store.cartItems.map((cartItem) => cartItem.item.id !== result.cartItem.item.id
                ? cartItem : {...cartItem, countOfItems: cartItem.countOfItems + 1}
            ).filter(({ countOfItems }) => countOfItems > 0),
            countOfItems: store.countOfItems + 1
        }
    }),

    on(cartPageActions.removeItemFromCart, (store: CartFeatureState, result) => {
        const cartItems = [...store.cartItems.filter(item => item.item.id !== result.cartItem.item.id)];
        return {
            cartItems,
            countOfItems: getNumberOfItems(cartItems)
        }
    }),

);