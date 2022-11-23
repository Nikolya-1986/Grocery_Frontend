import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

import { sharedActions } from "./actions/shared.action";
import { SharedFeatureState } from "./reducers/shared.state";
import * as sharedSelector from "../shared/reducers/shared.selector";


@Injectable({ 
    providedIn: 'root' 
})
export class SharedStoreFacade {
    
    public preloader$: Observable<boolean> = this.sharedStore.pipe(select(sharedSelector.selectPreloader));
    public errorMessage$: Observable<string> = this.sharedStore.pipe(select(sharedSelector.selectErrorMessage));

    constructor(
        private sharedStore: Store<SharedFeatureState>
    ) {}

    public getPreloader(status: boolean): void {
        this.sharedStore.dispatch(sharedActions.setPreloader({ status }));
    };

    public getErrorMessage(message: string): void {
        this.sharedStore.dispatch(sharedActions.getErrorMessage({ message: '' }));
    };

}