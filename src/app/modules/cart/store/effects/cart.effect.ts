import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs";

import { groceriesPageActions } from "../../../../modules/home/store/actions/grocery-page.actions";
import { groceryAddedSuccess } from "../actions/cart-api.actions";

@Injectable()
export class CartEffect {

    addItemToCart$ = createEffect(() => this.actions$.pipe(
        ofType(groceriesPageActions.addGroceryToCart),
        map(_ => (groceryAddedSuccess()))
        ),
        { useEffectsErrorHandler: false } 
    );

    constructor(
        private actions$: Actions,
    ) {}
}