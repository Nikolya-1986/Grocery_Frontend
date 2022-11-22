import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Grocery } from "../../model/grocery.model";


export const groceriesPageActions = createActionGroup({
    source: 'Groceries/Page',
    events: {
        'Request Groceries': emptyProps(),
        'Add Grocery To Cart': props<{ grocery: Grocery }>(),
        'Open Cart': emptyProps(),
    }
});
