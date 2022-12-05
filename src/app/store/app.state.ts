import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { cartReducer } from '../modules/cart/store/reducer/cart-item.reducer';
import { CartFeatureState } from '../modules/cart/store/reducer/cart-item.state';
import { sharedReucer } from './shared/reducers/shared.reducer';
import { SHARED_STATE_NAME } from './shared/reducers/shared.selector';
import { SharedFeatureState } from './shared/reducers/shared.state';
import { shellCartReducer } from './shell-cart/reducers/shell-cart.reducer';
import { CART_FEATURE_STATE, SHELL_CART_STATE } from './shell-cart/reducers/shell-cart.selector';
import { ShellCartState } from './shell-cart/reducers/shell-cart.state';


export interface AppState {
  [SHARED_STATE_NAME]: SharedFeatureState;
  [SHELL_CART_STATE]: ShellCartState;
  [CART_FEATURE_STATE]: CartFeatureState;
  router: RouterReducerState;
};

export const appReducer: ActionReducerMap<AppState> = {
  [SHARED_STATE_NAME]: sharedReucer,
  [SHELL_CART_STATE]: shellCartReducer,
  [CART_FEATURE_STATE]: cartReducer,
  router: routerReducer,
};