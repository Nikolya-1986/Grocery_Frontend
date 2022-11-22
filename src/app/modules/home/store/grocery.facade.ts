import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";

import { groceriesPageActions } from "./actions/grocery-page.actions";
import { selectGroceries } from "./reducers/grocery.selector";
import { GroceryFeatureState } from "./reducers/grocery.state";


@Injectable({ 
    providedIn: 'root' 
})
export class GroceryStoreFasade {

    public groseries$ = this.storeGrosery.pipe(select(selectGroceries));

    constructor(
        private storeGrosery: Store<GroceryFeatureState> 
    ) {}

    public getGroceries(): void {
        this.storeGrosery.dispatch(groceriesPageActions.requestGroceries())
    }

}