import { Action, createReducer, on } from "@ngrx/store";

import { sharedActions } from "../actions/shared.action";
import { initialSharedState, SharedFeatureState } from "./shared.state";


const innerSharedReucer = createReducer(
    initialSharedState,
    on(sharedActions.setPreloader, (state, action) => {
        return {
            ...state,
            isPreloader: action.status,
        }
    }),
    on(sharedActions.getErrorMessage, (state, action) => {
        console.log(action.message);
        
        return {
            ...state,
            errorMessage: action.message,
        }
    })
);

export function sharedReucer(state: SharedFeatureState | undefined, action: Action) {
    return innerSharedReucer(state, action);
}