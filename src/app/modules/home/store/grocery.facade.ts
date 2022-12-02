import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Grocery } from "../model/grocery.model";

import { groceriesPageActions } from "./actions/grocery-page.actions";
import { selectGroceries } from "./reducers/grocery.selector";
import { GroceryFeatureState } from "./reducers/grocery.state";


@Injectable({ 
    providedIn: 'root' 
})
export class GroceryStoreFasade {

    public groseries$!: Observable<Grocery[]>;

    constructor(
        private storeGrosery: Store<GroceryFeatureState> 
    ) {
        this.groseries$ = this.storeGrosery.pipe(select(selectGroceries));
    }

    public getGroceries(): void {
        this.storeGrosery.dispatch(groceriesPageActions.requestGroceries());
    };

    public addIGroceryToCart(grocery: Grocery): void {
        this.storeGrosery.dispatch(groceriesPageActions.addGroceryToCart({ grocery }));
    }

}