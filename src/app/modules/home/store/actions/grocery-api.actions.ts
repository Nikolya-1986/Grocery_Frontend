import { createAction, props } from "@ngrx/store";

import { Grocery } from "../../models/grocery.model";


export const groceriesLoadedSuccess = createAction(
    '[Groceries API] Groceries are loaded successfully',
    props<{ groceries: Grocery[] }>(),
);