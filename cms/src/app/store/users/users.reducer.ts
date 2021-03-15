import {IUser} from "../../models/users/user.interface";
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
        isLoading: true
      }

    case UsersActions.GET_USERS_SUCCESS:
      return {
        ...state,
        Users: action.payload,
        isLoading: false
      }

    case UsersActions.GET_USERS_FAILED:
      return {
        ...state,
        errorCode: action.payload,
        isLoading: false
      }

    default:
      return state
  }

}
