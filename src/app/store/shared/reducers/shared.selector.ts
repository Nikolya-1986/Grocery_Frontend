import { createFeatureSelector, createSelector } from "@ngrx/store";

import { SharedFeatureState } from "./shared.state";

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedFeatureState>(SHARED_STATE_NAME);

export const selectPreloader = createSelector(
    getSharedState,
    (state: SharedFeatureState) => {
        return state.isPreloader;
    }
);

export const selectErrorMessage = createSelector(
    getSharedState,
    (state: SharedFeatureState) => {
        console.log(state.errorMessage);
        return state.errorMessage;
    }
);
