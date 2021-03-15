import {ICategory} from "../../models/categories/category.interface";
import * as CategoryActions from "./categories.actions"

export interface State {
  Categories: ICategory[]
}

const initialState = {
  Categories: null,
  isLoading: false
}

export function categoriesReducer(
  state = initialState,
  action: CategoryActions.CategoryActions){

  switch (action.type){

    case CategoryActions.GET_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      }

    case CategoryActions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        Categories: action.payload,
        isLoading: false
      }

    default:
      return state

  }
}
