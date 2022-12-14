import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Grocery } from "../models/grocery.model";

import { groceriesPageActions } from "./actions/grocery-page.actions";
import { selectGroceries } from "./reducers/grocery.selector";
import { GroceryFeatureState } from "./reducers/grocery.state";


@Injectable({ 
    providedIn: 'root' 
})
export class GroceryStoreFasade {

    private groseries$!: Observable<Grocery[]>;

    constructor(
        private storeGrosery: Store<GroceryFeatureState> 
    ) { }

    public get groseries(): Observable<Grocery[]> {
        this.groseries$ = this.storeGrosery.pipe(select(selectGroceries));
        return this.groseries$;
    };

    public getGroceries(): void {
        this.storeGrosery.dispatch(groceriesPageActions.requestGroceries());
    };

    public addItemToCart(grocery: Grocery): void {
        this.storeGrosery.dispatch(groceriesPageActions.addGroceryToCart({ grocery }));
    }

}