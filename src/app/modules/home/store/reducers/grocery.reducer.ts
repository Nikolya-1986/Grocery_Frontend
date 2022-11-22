import { createReducer, on } from "@ngrx/store";

import { groceriesLoadedSuccess } from "../actions/grocery-api.actions";
import { initialGroceryState } from "./grocery.state";


export const groceryReducer = createReducer(
    initialGroceryState,
    on(groceriesLoadedSuccess, (store, action) => {
        return {
            ...store,
            groceries: action.groceries,
        }
    })
)