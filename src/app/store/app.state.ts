import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { sharedReucer } from './shared/reducers/shared.reducer';
import { SHARED_STATE_NAME } from './shared/reducers/shared.selector';
import { SharedFeatureState } from './shared/reducers/shared.state';


export interface AppState {
  [SHARED_STATE_NAME]: SharedFeatureState;
  router: RouterReducerState;
};

export const appReducer: ActionReducerMap<AppState> = {
  [SHARED_STATE_NAME]: sharedReucer,
  router: routerReducer,
};