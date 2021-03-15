import * as fromAuth from './auth/auth.reducer';
import * as fromUsers from './users/users.reducer'
import * as fromCategories from './categories/categories.reducer'
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  auth: fromAuth.State,
  users: fromUsers.State,
  categories: fromCategories.State
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  users: fromUsers.usersReducer,
  categories: fromCategories.categoriesReducer
}
