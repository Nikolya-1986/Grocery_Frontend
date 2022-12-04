import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CartItem } from "../model/cart-item.model";
import { cartPageActions } from "./actions/cart-page.actions";
import { selectCartItems, selectCartTotalPrice } from "./reducer/cart-item.selector";
import { CartFeatureState } from "./reducer/cart-item.state";

@Injectable({ 
    providedIn: 'root' 
})
export class CartStoreFacade {
    
    public cartGrocery$: Observable<CartItem[]>;
    public totalPrice$: Observable<number>;

    constructor(
        private cartStore: Store<CartFeatureState> 
    ) {
        this.cartGrocery$ = this.cartStore.pipe(select(selectCartItems));
        this.totalPrice$ = this.cartStore.pipe(select(selectCartTotalPrice));
    }

    public increaseItem(cartItem: CartItem): void {
        this.cartStore.dispatch(cartPageActions.increaseNumberOfItemInCart({ cartItem }));
    };

    public reduceItem(cartItem: CartItem): void {
        this.cartStore.dispatch(cartPageActions.reduceNumberOfItemInCart({ cartItem }));
    };

    public removeItem(cartItem: CartItem): void {
        this.cartStore.dispatch(cartPageActions.removeItemFromCart({ cartItem }));
    }
}