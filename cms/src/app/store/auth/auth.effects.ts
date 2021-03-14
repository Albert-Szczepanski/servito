import {Actions, createEffect, ofType} from '@ngrx/effects'
import * as AuthActions from './auth.actions'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IAuthToken} from "../../models/auth/auth-token.interface";
import {environment} from "../../../environments/environment";
import {of} from "rxjs";
import {Injectable} from "@angular/core";
import {User} from "../../models/auth/user.model";
import {Router} from "@angular/router";

const options = {
  headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
};

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}


  authLogin = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.GET_TOKEN_START),
    switchMap((authData: AuthActions.GetTokenStart) => {


      const requestBody = `grant_type=Bearer&password=${authData.payload.password}&username=${authData.payload.username}`;
      return this.http.post<IAuthToken>(environment.apiUrl + 'auth/sign-in', requestBody, options).

      pipe(
        map(res => {
          const user = new User();
          user.username = res.username;
          user.accessToken = res.accessToken
          return new AuthActions.GetTokenSuccess(user)
        }),
        catchError(() => of()),
      )
    })
  ))

  authSuccess = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.GET_TOKEN_SUCCESS),
    tap(() => {
      this.router.navigate(['home/dashboard']);
    })
  ), {dispatch:false})


}
