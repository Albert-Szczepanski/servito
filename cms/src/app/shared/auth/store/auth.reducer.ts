import * as AuthActions from './auth.actions';
import {User} from "../models/user.model";

export interface State {
  user: User
  message: string;
  isLoading: boolean;
}

const initialState = {
  user: null,
  message: null,
  isLoading: false,
}

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions) {
  switch (action.type) {

    case AuthActions.GET_TOKEN_START:
      return {
        ...state,
        user: null,
        message: 'Loggin In',
        isLoading: true
      };

    case AuthActions.GET_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        message: 'Logged In',
        isLoading: false
      };

    case AuthActions.GET_TOKEN_FAILED:
      return {
        ...state,
        user: null,
        message: action.payload,
        isLoading: false
      };

    case AuthActions.LOG_OUT:
      return {
        ...state,
        user: null,
        message: 'Logged Out',
        isLoading: false
      };

    default:
      return state;
  }
}
