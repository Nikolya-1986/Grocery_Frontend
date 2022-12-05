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
    
    private preloader$!: Observable<boolean>;
    private errorMessage$!: Observable<string>;

    constructor(
        private sharedStore: Store<SharedFeatureState>
    ) { }

    public get preloader(): Observable<boolean> {
        this.preloader$ = this.sharedStore.pipe(select(sharedSelector.selectPreloader));
        return this.preloader$;
    };

    public get errorMessage(): Observable<string> {
        this.errorMessage$ = this.sharedStore.pipe(select(sharedSelector.selectErrorMessage));
        return this.errorMessage$;
    };

    public getPreloader(status: boolean): void {
        this.sharedStore.dispatch(sharedActions.setPreloader({ status }));
    };

    public getErrorMessage(message: string): void {
        this.sharedStore.dispatch(sharedActions.getErrorMessage({ message: '' }));
    };

}