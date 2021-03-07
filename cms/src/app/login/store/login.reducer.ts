import * as LoginActions from './login.actions';
import {AuthRequestModel} from '../../shared/models/auth-request.model';

const initialState = {
  authRequest: []
};

export function loginReducer(
  state = initialState,
  action: LoginActions.GetAuth) {
  switch (action.type) {
    case LoginActions.GET_AUTH:
      return {
        ...state,
        authRequest: [...state.authRequest, action.payload]
      };
  }
}
