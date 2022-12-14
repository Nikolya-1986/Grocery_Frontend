import { createReducer, on } from '@ngrx/store';
import { initialShellCartState } from './shell-cart.state';

import { groceriesPageActions } from '../../../modules/home/store/actions/grocery-page.actions';

export const shellCartReducer = createReducer(
    initialShellCartState,
    on(groceriesPageActions.openCart, () => ({
        cartOpen: true
    }))
);