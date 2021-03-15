import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import * as CategoriesActions from "./categories.actions"
import {catchError, map, switchMap} from "rxjs/operators";
import {ICategory} from "../../models/categories/category.interface";
import {environment} from "../../../environments/environment";
import {of} from "rxjs";

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private http: HttpClient) {
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
}
