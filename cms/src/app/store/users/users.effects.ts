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
import {ToastService} from "../../shared/services/toast.service";

@Injectable()
export class UsersEffects {
  constructor(
    private toast: ToastService,
    private  actions$: Actions,
    private http: HttpClient,
    private store:  Store<fromApp.AppState>) {}

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

  createInitialUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.CREATE_INITIAL_USER_START),
      switchMap((actionData: UsersActions.CreateInitialUserStart) => {
        const options = {
          headers: new HttpHeaders().set('Authorization', `Bearer`)
        };
        return this.http.post<IUser>(`${environment.apiUrl}users/user/init`, actionData.payload, options).
        pipe(
          map(res => {
            return new UsersActions.CreateInitialUserSuccess(res)
          }),
          catchError(err => {
            return of(new UsersActions.CreateUserFailed(err.status))
          })
        )
      })
    )
  })

  createUser = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.CREATE_USER_START),
      withLatestFrom(this.store.select("auth")),
      switchMap(([actionData, authData]) => {
        const options = {
          headers: new HttpHeaders().set('Authorization', `Bearer ${authData.user.accessToken}`)
        };
        return this.http.post<IUser>(`${environment.apiUrl}users/user`, actionData['payload'], options).
        pipe(
          map(res => {
            this.toast.showSnackBar(`Użytkownik ${res.username} został dodany`, 'success')
            return new UsersActions.CreateUserSuccess(res)
          }),
          catchError(err => {
            return of(new UsersActions.CreateUserFailed(err.status))
          })
        )
      })
    )
  })

  onFailed = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.CREATE_USER_FAILED),
      switchMap((actionData: UsersActions.CreateUserFailed) => {
        console.log(actionData.payload)
        switch (actionData.payload){
          case 409:
            this.toast.showSnackBar('Email pusty', 'alert')
            break;
          case 400:
            this.toast.showSnackBar('Użytkownik ma pustą nazwę', 'alert')
            break;
          case 406:
            this.toast.showSnackBar('Użytkownik z taką nazwą już istnieje', 'alert')
            break;
          default:
            this.toast.showSnackBar('Wystąpił nieznany błąd', 'alert')
        }
        return of()
      })
    )
  }, {dispatch:false})


}
