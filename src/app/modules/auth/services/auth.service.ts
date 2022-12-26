import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { UserModel } from "../models/user-model";

@Injectable()
export class AuthService  {

    private readonly BASE_URL = 'http://localhost:8000/auth';

    constructor(
        private httpClient: HttpClient
    ) {}

    public signUp(payload: UserModel) {
        return this.httpClient.post(`${this.BASE_URL}/signup`, payload)
    }
}