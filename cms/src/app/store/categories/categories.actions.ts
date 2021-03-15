import {Action} from "@ngrx/store";
import {ICategory} from "../../models/categories/category.interface";

export const GET_CATEGORIES_START = '[Categories] GET_CATEGORIES_START';
export const GET_CATEGORIES_SUCCESS = '[Categories] GET_CATEGORIES_SUCCESS';

export const ADD_CATEGORY_START = '[Categories] ADD_CATEGORY_START';
export const ADD_CATEGORY_SUCCESS = '[Categories] ADD_CATEGORY_SUCCESS';
export const ADD_CATEGORY_FAILED = '[Categories] ADD_CATEGORY_FAILED';

export const EDIT_CATEGORY_START = '[Categories] EDIT_CATEGORY_START';
export const EDIT_CATEGORY_SUCCESS = '[Categories] EDIT_CATEGORY_SUCCESS';
export const EDIT_CATEGORY_FAILED = '[Categories] EDIT_CATEGORY_FAILED';

export const DELETE_CATEGORY_START = '[Categories] DELETE_CATEGORY_START';
export const DELETE_CATEGORY_SUCCESS = '[Categories] DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAILED = '[Categories] DELETE_CATEGORY_FAILED';

export class GetCategoriesStart implements Action {
  readonly type = GET_CATEGORIES_START
}

export class GetCategoriesSuccess implements Action {
  readonly type = GET_CATEGORIES_SUCCESS
  constructor(public payload: ICategory[]) {}
}

export class AddCategoryStart implements Action {
  readonly type = ADD_CATEGORY_START;
  constructor(public payload: {name: string, priority: number}) {}
}

export class AddCategorySuccess implements Action {
  readonly type = ADD_CATEGORY_SUCCESS;
  constructor(public payload: ICategory) {}
}

export class AddCategoryFailed implements Action {
  readonly type = ADD_CATEGORY_FAILED;
  constructor(public payload: string) {}
}

export class EditCategoryStart implements Action {
  readonly type = EDIT_CATEGORY_START;
  constructor(public payload: ICategory) {}
}

export class EditCategorySuccess implements Action {
  readonly type = EDIT_CATEGORY_SUCCESS;
  constructor(public payload: ICategory) {}
}

export class EditCategoryFailed implements Action {
  readonly type = EDIT_CATEGORY_FAILED
  constructor(public payload: string) {}
}

export class DeleteCategoryStart implements Action {
  readonly type = DELETE_CATEGORY_START
  constructor(public payload: ICategory) {}
}

export class DeleteCategorySuccess implements Action {
  readonly type = DELETE_CATEGORY_SUCCESS
  constructor(public payload: ICategory) {}
}

export class DeleteCategoryFailed implements Action {
  readonly type = DELETE_CATEGORY_FAILED
  constructor(public payload: string) {}
}

export type CategoryActions =
    GetCategoriesStart
  | GetCategoriesSuccess
  | AddCategoryStart
  | AddCategorySuccess
  | AddCategoryFailed
  | EditCategoryStart
  | EditCategorySuccess
  | EditCategoryFailed
  | DeleteCategoryStart
  | DeleteCategorySuccess
  | DeleteCategoryFailed;
