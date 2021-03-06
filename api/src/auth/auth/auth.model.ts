import {Column, ObjectID, ObjectIdColumn} from "typeorm";

export interface IAccess {
    username: string;
    accessToken: string;
    expireDate: Date;
}

export interface IAccessToken {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    passwordReset: boolean;
}
