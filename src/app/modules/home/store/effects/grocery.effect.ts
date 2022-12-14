import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { sharedActions } from '../../../../store/shared/actions/shared.action';
import { SharedStoreFacade } from '../../../../store/shared/shared.facade';
import { Grocery } from '../../models/grocery.model';
import { FacadeService } from '../../services/facades/facade.service';
import { groceriesLoadedSuccess } from '../actions/grocery-api.actions';
import { groceriesPageActions } from '../actions/grocery-page.actions';

@Injectable()
export class GroceryEffect {

    loadArticles$ = createEffect(() => this.actions$.pipe(
        ofType(groceriesPageActions.requestGroceries),
        mergeMap(() => this.facadeService.getGroceries()
            .pipe(
                map((groceries: Grocery[]) => {
                    this.sharedStore.getPreloader(false);
                    this.sharedStore.getErrorMessage('');
                    return (groceriesLoadedSuccess({ groceries }))
                }),
                catchError((error) => {
                    console.log(error.message);
                    this.sharedStore.getPreloader(false);
                    return (of(sharedActions.getErrorMessage(error)));
                })
            ))
        ),
        { useEffectsErrorHandler: false } 
    );

    constructor(
        private actions$: Actions,
        private facadeService: FacadeService,
        private sharedStore: SharedStoreFacade,
    ) { }
}