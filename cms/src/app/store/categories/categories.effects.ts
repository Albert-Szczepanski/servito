import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import * as CategoriesActions from "./categories.actions"
import {catchError, delay, map, switchMap, withLatestFrom} from "rxjs/operators";
import {ICategory} from "../../models/categories/category.interface";
import {environment} from "../../../environments/environment";
import {of, pipe} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../app.reducer";
import {ToastService} from "../../shared/services/toast.service";

@Injectable()
export class CategoriesEffects {
  constructor(private actions$: Actions, private http: HttpClient, private store:  Store<fromApp.AppState>, private toast: ToastService) {
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
          this.toast.showSnackBar(`Kategoria ${res.name} została dodana`, 'success');
          return new CategoriesActions.AddCategorySuccess(res)
        }),
        catchError(err => {
          if (err.status === 400){
            this.toast.showSnackBar(`Nie można utworzyć kategorii bez nazwy`, 'alert');
          }
          if (err.status === 406){
            this.toast.showSnackBar(`Kategoria o tej nazwie już istnieje`, 'alert');
          }
          return of(new CategoriesActions.AddCategoryFailed(err.status));
        })
      )
    })
  ))

  deleteCategory = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActions.DELETE_CATEGORY_START),
    withLatestFrom(this.store.select("auth")),
    switchMap(([categoryData, authData]) => {
      const options = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${authData.user.accessToken}`)
      };
      return this.http.delete<ICategory>(`${environment.apiUrl}categories/category/delete/${categoryData['payload']['id']}`, options).pipe(
        map(res => {
          this.toast.showSnackBar(`Kategoria ${res.name} została usunięta`, 'info');
          return new CategoriesActions.DeleteCategorySuccess(res)
        }), catchError(err => {
          return of(new CategoriesActions.DeleteCategoryFailed(err))
        })
      )
    }),
  ))

  upadateCategory = createEffect(() => this.actions$.pipe(
    ofType(CategoriesActions.EDIT_CATEGORY_START),
    withLatestFrom(this.store.select("auth")),
    switchMap(([categoryData, authData]) => {
      const options = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${authData.user.accessToken}`)
      };
      return this.http.patch<ICategory>(`${environment.apiUrl}categories/category/update/`, categoryData['payload'] , options).pipe(
        map(res => {
          this.toast.showSnackBar(`Kategoria ${res.name} została zaktualizowana`, 'info');
          return new CategoriesActions.EditCategorySuccess(res)
        }), catchError(err => {
          return of(new CategoriesActions.EditCategorySuccess(err))
        })
      )
    }),
  ))



}
