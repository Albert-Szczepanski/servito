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

export class GetCategoriesStart implements Action {
  readonly type = GET_CATEGORIES_START
}

export class GetCategoriesSuccess implements Action {
  readonly type = GET_CATEGORIES_SUCCESS
  constructor(public payload: ICategory[]) {
  }
}

export type CategoryActions = GetCategoriesStart | GetCategoriesSuccess;
