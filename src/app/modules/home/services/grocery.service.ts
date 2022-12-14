import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Grocery } from '../models/grocery.model';


@Injectable({
    providedIn: 'root'
})
export class GroceryService {

    private readonly BASE_URL = 'http://localhost:3000';

    constructor(
        private http: HttpClient
    ) { }

    public getGroceries(): Observable<Grocery[]> {
        return this.http.get<Grocery[]>(`${this.BASE_URL}/groceries`);
    };

}