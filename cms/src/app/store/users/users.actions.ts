import {Action} from "@ngrx/store";
import {IUser} from "../../models/users/user.interface";

export const GET_USERS_START = '[Users] GET_USERS_START';
export const GET_USERS_SUCCESS = '[Users] GET_USERS_SUCCESS';
export const GET_USERS_FAILED = '[Users] GET_USERS_FAILED';

export class GetUsersStart implements Action{
  readonly type = GET_USERS_START
}

export class GetUsersSuccess implements Action{
  readonly type = GET_USERS_SUCCESS
  constructor(public payload: IUser[]) {}
}

export class GetUsersFailed implements Action{
  readonly type = GET_USERS_FAILED
  constructor(public payload: string) {}
}

export type UsersActions =  GetUsersStart | GetUsersSuccess | GetUsersFailed
