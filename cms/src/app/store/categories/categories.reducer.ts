import {ICategory} from "../../models/categories/category.interface";
import * as CategoryActions from "./categories.actions"

export interface State {
  categories: ICategory[]
  isLoading: boolean;
  successMessage: string;
  errorCode: number;
}

const initialState = {
  categories: null,
  isLoading: false,
  successMessage: null,
  errorCode: null,
}

export function categoriesReducer(
  state = initialState,
  action: CategoryActions.CategoryActions){

  switch (action.type){

    case CategoryActions.GET_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        errorCode: null,
      }

    case CategoryActions.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
        errorCode: null
      }

    case CategoryActions.ADD_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
        successMessage: null,
        errorCode: null
      }

    case CategoryActions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        isLoading: false,
        errorCode: null,
        successMessage: 'ADD_CATEGORY_SUCCESS'
      }

    case CategoryActions.ADD_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errorCode: action.payload
      }

    case CategoryActions.DELETE_CATEGORY_START:
      return {
        ...state,
        successMessage: null,
        isLoading: true,
        errorCode: null
      }

    case CategoryActions.DELETE_CATEGORY_SUCCESS:
      console.log(state.categories.filter(category => category.id !== action.payload.id))
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload.id),
        isLoading: false,
        errorCode: null,
        successMessage: 'DELETE_CATEGORY_SUCCESS'
      }

    case CategoryActions.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errorCode: action.payload
      }


    case CategoryActions.EDIT_CATEGORY_START:
      return {
        ...state,
        isLoading: true,
        errorCode: null,
        successMessage: 'DELETE_CATEGORY_SUCCESS'
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
        errorCode: null
      }

    case CategoryActions.EDIT_CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errorCode: action.payload
      }

    default:
      return state

  }
}
