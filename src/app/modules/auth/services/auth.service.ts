import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, of } from "rxjs";
import { JwtHelperService } from '@auth0/angular-jwt';

import { UserModel } from "../models/user-model";
import { AuthModel } from "../models/auth-model";
import { TokenModel } from "../models/token-model";

@Injectable()
export class AuthService  {

    public userProfile: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
    private jwtService: JwtHelperService = new JwtHelperService();
    private readonly BASE_URL = 'http://localhost:3000/auth';

    constructor(
        private httpClient: HttpClient
    ) {}


    public signUp(payload: AuthModel): Observable<boolean> {
         return this.httpClient.post(`${this.BASE_URL}/signup`, payload).pipe(
            map((data) => {
                const token = data as TokenModel;
                localStorage.setItem('token', JSON.stringify(token));

                const userInfo = this.jwtService.decodeToken(
                    token.access_token,
                ) as UserModel;

                this.userProfile.next(userInfo);
                return true;
            }),
            catchError((error) => {
                console.log(error);
                return of(false);
            })
        )
    }
}