import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { CatrGrocery } from "../model/cart-grocery.model";
import { selectCartGrocery, selectCartTotalPrice } from "./reducer/cart-grocery.selector";
import { CartFeatureState } from "./reducer/cart-grocery.state";

@Injectable({ 
    providedIn: 'root' 
})
export class CartStoreFacade {
    
    public cartGrocery$: Observable<CatrGrocery[]>;
    public totalPrice$: Observable<number>;

    constructor(
        private cartStore: Store<CartFeatureState> 
    ) {
        this.cartGrocery$ = this.cartStore.pipe(select(selectCartGrocery));
        this.totalPrice$ = this.cartStore.pipe(select(selectCartTotalPrice));
    }
}