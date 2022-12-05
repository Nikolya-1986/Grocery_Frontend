import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { selectCountOfCartItems } from "./reducers/shell-cart.selector";
import { ShellCartState } from "./reducers/shell-cart.state";

@Injectable({
    providedIn: 'root'
})
export class ShellCartFacade {

    private countOfItems$!: Observable<number>;

    constructor(
        private shellCartStore: Store<ShellCartState>
    ) {}

    public get countOfItems(): Observable<number> {
        this.countOfItems$ = this.shellCartStore.pipe(select(selectCountOfCartItems));
        return this.countOfItems$;
    }
}