import {Action} from '@ngrx/store';
import {AuthRequestModel} from '../../models/auth/auth-request.model';
import {User} from "../../models/auth/user.model";

export const LOG_OUT = '[Auth] LOG_OUT';

export const GET_TOKEN_START = '[Auth] GET_TOKEN_START';
export const GET_TOKEN_SUCCESS = '[Auth] GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILED = '[Auth] GET_TOKEN_FAILED';


export class Logout implements Action {
  readonly type = LOG_OUT;
}

export class GetTokenStart implements Action {
  readonly type = GET_TOKEN_START;
  constructor(public payload: AuthRequestModel) {}
}

export class GetTokenSuccess implements Action {
  readonly type = GET_TOKEN_SUCCESS;
  constructor(public payload: User) {}
}

export class GetTokenFailed implements Action {
  readonly type = GET_TOKEN_FAILED;
  constructor(public payload: string) {}
}

export type AuthActions =  Logout | GetTokenStart | GetTokenSuccess | GetTokenFailed
