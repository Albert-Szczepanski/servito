import {ICategory} from "../../models/categories/category.interface";
import * as CategoryActions from "./categories.actions"

export interface State {
  categories: ICategory[]
}

const initialState = {
  categories: null,
  isLoading: false,
  errorMessage: null,
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
        categories: action.payload,
        isLoading: false
      }

    case CategoryActions.ADD_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }

    case CategoryActions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        isLoading: false,
        errorMessage: null
      }

    case CategoryActions.ADD_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }

    case CategoryActions.DELETE_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }

    case CategoryActions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload.id),
        isLoading: false,
        errorMessage: null
      }

    case CategoryActions.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }


    case CategoryActions.EDIT_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }

    case CategoryActions.EDIT_CATEGORY_SUCCESS:

      const categoryIndex = state.categories.findIndex(category => category.id === action.payload.id);
      const category = state.categories[categoryIndex];
      const updatedCategory = {
        ...category,
        ...action.payload
      }
      const updatedCategories = [...state.categories];
      updatedCategories[categoryIndex] = updatedCategory;

      return {
        ...state,
        categories: updatedCategories,
        isLoading: false,
        errorMessage: null
      }

    case CategoryActions.EDIT_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload
      }

    default:
      return state

  }
}
