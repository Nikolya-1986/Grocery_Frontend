import { Injectable, Injector } from "@angular/core";
import { catchError, delay, Observable, retry } from "rxjs";

import { Grocery } from "../../models/grocery.model";
import { ErrorService } from "../error.service";
import { GroceryService } from "../grocery.service";


@Injectable({
    providedIn: 'root',
})
export class FacadeService {

    private _groceryService!: GroceryService;
    public get groceryService(): GroceryService {
        if(!this._groceryService) {
            this._groceryService = this.injector.get(GroceryService);
        }
        return this._groceryService;
    };
  
    private _errorService!: ErrorService;
    public get errorService(): ErrorService {
        if(!this._errorService) {
            this._errorService = this.injector.get(ErrorService);
        }
        return this._errorService;
    };

    constructor(
        private injector: Injector,
    ){ } 


    public getGroceries(): Observable<Grocery[]> {
        return this.groceryService.getGroceries().pipe(
            retry(3),
            delay(3000),
            catchError(this.errorService.errorsBackend.bind(this)),
        );
    };

}