import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { GroceryService } from '../../services/grocery.service';
import { groceriesLoadedSuccess } from '../actions/grocery-api.actions';
import { groceriesPageActions } from '../actions/grocery-page.actions';

@Injectable()
export class GroceryEffect {

    loadArticles$ = createEffect(() => this.actions$.pipe(
        ofType(groceriesPageActions.requestGroceries),
        mergeMap(() => this.groceryService.getGroceries()
            .pipe(
                map(groceries => (groceriesLoadedSuccess({ groceries }))),
                catchError(() => EMPTY)
            ))
        ),
        { useEffectsErrorHandler: false } 
    );

    constructor(
        private actions$: Actions,
        private groceryService: GroceryService
    ) { }
}