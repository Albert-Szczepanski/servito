import {IUser, IUserRegister} from "../../models/users/user.interface";
import * as UsersActions from "./users.actions";

export interface State {
  Users: IUser[];
}

const initialState = {
  Users: null,
  isLoading: false,
  errorCode: null
}

export function usersReducer(
  state = initialState,
  action: UsersActions.UsersActions){

  switch (action.type){

    case UsersActions.GET_USERS_START:
      return {
        ...state,
        Users: null,
        isLoading: true,
        errorCode: null,
      }

    case UsersActions.GET_USERS_SUCCESS:
      return {
        ...state,
        Users: action.payload,
        isLoading: false,
        errorCode: null
      }

    case UsersActions.GET_USERS_FAILED:
      return {
        ...state,
        errorCode: action.payload,
        isLoading: false
      }

    case UsersActions.CREATE_USER_START:
      return {
        ...state,
        isLoading: true,
        errorCode: null,
      }

    case UsersActions.CREATE_USER_SUCCESS:
      return {
        ...state,
        Users: [...state.Users, action.payload],
        isLoading: true,
        errorCode: null,
      }

    case UsersActions.CREATE_INITIAL_USER_START:
      return {
        ...state,
        Users: [action.payload],
        isLoading: true,
        errorCode: null,
      }

    case UsersActions.CREATE_INITIAL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorCode: null,
      }

    case UsersActions.CREATE_USER_FAILED:
      return {
        ...state,
        errorCode: action.payload,
        isLoading: false
      }

    default:
      return state
  }

}
