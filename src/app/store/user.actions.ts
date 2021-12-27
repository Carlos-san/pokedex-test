import { Action, createAction, props } from '@ngrx/store';
import { LoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';

export enum UserActionsTypes {
  createUser = '[Users] -  Add a new pokemon trainer',
  login = '[User] - Update the current user logged',
  logout = '[User] - Remove current user data',
}

export const CreateUserAction = createAction(UserActionsTypes.createUser, props<{user: UserModel}>());
export const LoginAction = createAction(UserActionsTypes.login, props<{user: UserModel}>());
export const logout = createAction(UserActionsTypes.logout);
