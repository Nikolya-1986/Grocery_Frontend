import { createReducer, on } from "@ngrx/store";

import { groceriesPageActions } from "../../../../modules/home/store/actions/grocery-page.actions";
import { CatrGrocery } from "../../model/cart-grocery.model";
import { cartPageActions } from "../actions/cart-page.actions";
import { CartFeatureState, initialCartState } from "./cart-grocery.state";

const getCountOfGrocery = (cartItems: CatrGrocery[]): number => {
    return cartItems.reduce((accSum, cartItem) => accSum + cartItem.countOfGrocery, 0)
};

export const cartReducer = createReducer(
    initialCartState,
    on(groceriesPageActions.addGroceryToCart, (state: CartFeatureState, action) => {
        const existingItem = state.cartItems.find(( { id }) => id === action.grocery.id)
        return {
            ...state,
            cartItems: state.cartItems.map((itemCart: CatrGrocery) => itemCart.grocery.id !== action.grocery.id ? itemCart :
            { ...itemCart, numberOfGrocery: itemCart.countOfGrocery + 1 } 
            ).concat(existingItem ? [] : [{ id: action.grocery.id, countOfGrocery: 1, grocery: action.grocery }]),
            countOfGrocery: state.countOfGrocery + 1,
        }
    }),

    on(cartPageActions.decreaseCountOfGeoceryInCart, (state: CartFeatureState, action) => {
        return {
            ...state,
            cartItems: state.cartItems.map((itemCart: CatrGrocery) => itemCart.id !== action.cartItem.id ? itemCart :
            { ...itemCart, numberOfGrocery: itemCart.countOfGrocery - 1 }
            ).filter(({ countOfGrocery }) => countOfGrocery > 0),
        }
    }),

    on(cartPageActions.increaseCountOfGeoceryInCart, (state: CartFeatureState, action) => {
        return {
            ...state,
            cartItems: state.cartItems.map((itemCart: CatrGrocery) => itemCart.id !== action.cartItem.id ? itemCart :
            { ...itemCart, numberOfGrocery: itemCart.countOfGrocery + 1} 
            ).filter(({ countOfGrocery }) => countOfGrocery > 0),
        }
    }),

    on(cartPageActions.removeGeoceryFromCart, (state: CartFeatureState, action) => {
        const cartItems = [...state.cartItems.filter(item => item.id !== action.cartItem.id)];
        return {
            cartItems,
            countOfGrocery: getCountOfGrocery(cartItems),
        }
    }),
    
)