import { createActionGroup, props } from "@ngrx/store";
import { CatrGrocery } from "../../model/cart-grocery.model";

export const cartPageActions = createActionGroup({
    source: 'Cart/Page',
    events: {
        'Decrease count of geocery in cart': props<{ cartItem: CatrGrocery }>(),
        'Increase count of geocery in cart': props<{ cartItem: CatrGrocery }>(),
        'Remove geocery from cart': props<{ cartItem: CatrGrocery  }>(),
    }
});