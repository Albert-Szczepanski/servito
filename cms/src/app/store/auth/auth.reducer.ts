import * as AuthActions from './auth.actions';
import {User} from "../../models/auth/user.model";

export interface State {
  user: User
  message: string;
  isLoading: boolean;
}

const initialState = {
  user: null,
  message: 'Not logged in',
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
        message: 'LOGGING_IN',
        isLoading: true
      };

    case AuthActions.GET_TOKEN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        message: 'LOGGED_IN',
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
        message: 'LOGGED_OUT',
        isLoading: false
      };

    default:
      return state;
  }
}
