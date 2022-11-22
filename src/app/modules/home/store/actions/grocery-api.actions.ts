import { createAction, props } from "@ngrx/store";

import { Grocery } from "../../model/grocery.model";


export const groceriesLoadedSuccess = createAction(
    '[Groceries API] Groceries Are Loaded Successfully',
    props<{ groceries: Grocery[] }>(),
);