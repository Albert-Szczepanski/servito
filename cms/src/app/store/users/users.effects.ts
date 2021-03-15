import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as UsersActions from './users.actions'
import * as AuthActions from '../auth/auth.actions'
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {IUser} from "../../models/users/user.interface";
import {of} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../app.reducer";

@Injectable()
export class UsersEffects {
  constructor(private  actions$: Actions, private http: HttpClient, private store:  Store<fromApp.AppState>) {}

  getUsersList = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.GET_USERS_START),
      withLatestFrom(this.store.select("auth")),
      switchMap(([actionData, authData]) => {

        const options = {
          headers: new HttpHeaders().set('Authorization', `Bearer ${authData.user.accessToken}`)
        };

        return this.http.get<IUser[]>(`${environment.apiUrl}users`, options).pipe(
          map(res => new UsersActions.GetUsersSuccess(res)),
          catchError(err => {
            return of(
              new UsersActions.GetUsersFailed(err.status),
              new AuthActions.Logout()
            )
          })
        )
      })
    );
  })


}
