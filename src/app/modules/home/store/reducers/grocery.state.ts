import { Grocery } from "../../models/grocery.model";

export interface GroceryFeatureState {
    groceries: Grocery[],
};

export const initialGroceryState: GroceryFeatureState = {
    groceries: [],
};

export default interface DefaultGroceryState {
    groceries: GroceryFeatureState,
}