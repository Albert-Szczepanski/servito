export interface IUser {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  passwordReset: boolean;
}

export interface IUserRegister {
  username: string;
  email: string;
  password: string;
}
