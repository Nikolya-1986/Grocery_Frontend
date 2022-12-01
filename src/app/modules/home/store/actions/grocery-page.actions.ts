import { createActionGroup, emptyProps, props } from "@ngrx/store";

import { Grocery } from "../../model/grocery.model";


export const groceriesPageActions = createActionGroup({
    source: 'Groceries/Page',
    events: {
        'Request groceries': emptyProps(),
        'Add grocery to cart': props<{ grocery: Grocery }>(),
        'Open cart': emptyProps(),
    }
});
