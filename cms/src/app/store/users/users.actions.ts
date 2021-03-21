import {Action} from "@ngrx/store";
import {IUser, IUserRegister} from "../../models/users/user.interface";

export const GET_USERS_START = '[Users] GET_USERS_START';
export const GET_USERS_SUCCESS = '[Users] GET_USERS_SUCCESS';
export const GET_USERS_FAILED = '[Users] GET_USERS_FAILED';

export const CREATE_USER_START = '[Users] CREATE_USER_START';
export const CREATE_INITIAL_USER_START = '[Users] CREATE_INITIAL_USER_START';
export const CREATE_INITIAL_USER_SUCCESS = '[Users] CREATE_INITIAL_USER_START';
export const CREATE_USER_SUCCESS = '[Users] CREATE_USER_SUCCESS';
export const CREATE_USER_FAILED = '[Users] CREATE_USER_FAILED';

export const EDIT_USER_START = '[Users] EDIT_USER_START';
export const EDIT_USER_SUCCESS = '[Users] EDIT_USER_SUCCESS';
export const EDIT_USER_FAILED = '[Users] EDIT_USER_FAILED';

export class GetUsersStart implements Action{
  readonly type = GET_USERS_START
}

export class GetUsersSuccess implements Action{
  readonly type = GET_USERS_SUCCESS
  constructor(public payload: IUser[]) {}
}

export class GetUsersFailed implements Action{
  readonly type = GET_USERS_FAILED
  constructor(public payload: number) {}
}

export class CreateUserStart implements Action{
  readonly type = CREATE_USER_START;
  constructor(public payload: IUserRegister) {}
}

export class CreateInitialUserStart implements Action{
  readonly type = CREATE_INITIAL_USER_START;
  constructor(public payload: IUserRegister) {}
}

export class CreateInitialUserSuccess implements Action{
  readonly type = CREATE_INITIAL_USER_SUCCESS;
  constructor(public payload: IUser) {}
}

export class CreateUserSuccess implements Action{
  readonly type = CREATE_USER_SUCCESS;
  constructor(public payload: IUser) {}
}

export class CreateUserFailed implements Action{
  readonly type = CREATE_USER_FAILED;
  constructor(public payload: number) {}
}

export class EditUserStart implements Action{
  readonly type = EDIT_USER_START
  constructor(public payload: IUser) {}
}

export class EditUserSuccess implements Action{
  readonly type = EDIT_USER_SUCCESS
  constructor(public payload: IUser) {}
}

export class EditUserFailed implements Action{
  readonly type = EDIT_USER_FAILED
  constructor(public payload: number) {}
}


export type UsersActions =
    GetUsersStart
  | GetUsersSuccess
  | GetUsersFailed
  | CreateUserStart
  | CreateUserSuccess
  | CreateUserFailed
  | EditUserStart
  | EditUserSuccess
  | EditUserFailed
  | CreateInitialUserStart
  | CreateInitialUserSuccess
