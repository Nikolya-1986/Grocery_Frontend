import { createActionGroup, props } from "@ngrx/store";

export const sharedActions = createActionGroup({
    source: 'Any/Page',
    events: {
        'Set Preloader': props<{ status: boolean }>(),
        'Get Error Message': props<{ message: string }>(),
    }
})
