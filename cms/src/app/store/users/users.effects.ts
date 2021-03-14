import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as UsersActions from './users.actions'
import {catchError, map, switchMap} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {IUser} from "../../models/users/user.interface";
import {of} from "rxjs";

@Injectable()
export class UsersEffects {
  constructor(private  actions$: Actions, private http: HttpClient) {}

  getUsers = createEffect(() => this.actions$.pipe(
    ofType(UsersActions.GET_USERS_START),
    switchMap((UsersData: UsersActions.GetUsersStart) => {
      const options = {
        headers: new HttpHeaders().set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNDRlYmNlYmRlMDEwMTllYjZmNmVjYyIsInVzZXJuYW1lIjoiYWxiZXJ0LnN6Y3plcGFuc2tpIiwiZW1haWwiOiJhbGJlcnQuc3pjemVwYW5za2kwMkBnbWFpbC5jb20iLCJpc0FkbWluIjp0cnVlLCJwYXNzd29yZFJlc2V0IjpmYWxzZSwiaWF0IjoxNjE1Njc1MzU5LCJleHAiOjE2MTU3MTEzNTl9.rmbou6Se2lEubvmrMn4knef2gIMjiEn-CWmzeS5WkMI')
      };

      return this.http.get<IUser[]>(`${environment.apiUrl}users`, options).pipe(
        map(res => {
          return of();
        }), catchError(() => {
          return of()
        })
      )
    })
  ))

}
