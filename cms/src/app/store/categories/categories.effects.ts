import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as CategoriesActions from "./categories.actions"
import {catchError, map, switchMap, withLatestFrom} from "rxjs/operators";
import {ICategory} from "../../models/categories/category.interface";
import {environment} from "../../../environments/environment";
import {of, pipe} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../app.reducer";

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store:  Store<fromApp.AppState>) {
  }

  getCategories = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActions.GET_CATEGORIES_START),
    switchMap(() => {
      return this.http.get<ICategory[]>(`${environment.apiUrl}categories`).pipe(
        map(res => {
          return new CategoriesActions.GetCategoriesSuccess(res);
        }),
        catchError(err => {
          return of(err)
        })
      )
    })
  ))

  addCategory = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActions.ADD_CATEGORY_START),
    withLatestFrom(this.store.select("auth")),
    switchMap(([categoryData, authData]) => {
      const options = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${authData.user.accessToken}`)
      };
      return this.http.post<ICategory>(`${environment.apiUrl}categories/category/create`, categoryData['payload'], options).
      pipe(
        map(res => {
          return new CategoriesActions.AddCategorySuccess(res)
        }),
        catchError(err => {
          return of(new CategoriesActions.AddCategoryFailed(err.code));
        })
      )
    })
  ))
}
