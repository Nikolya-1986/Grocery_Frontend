import { createSelector } from "@ngrx/store";

import { GroceryFeatureState } from "./grocery.state";

export const selectGroceryState = (state: GroceryFeatureState) => state;

export const selectGroceries = createSelector(
    selectGroceryState,
    (state: GroceryFeatureState | any) => {
        return state?.groceriesFeature?.groceries;
    }
)