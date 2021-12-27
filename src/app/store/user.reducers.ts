import { createReducer, on } from "@ngrx/store";
import { UserModel } from "../models/user.model";
import  * as UserActions  from "./user.actions";

export interface State {
  loggedUser: UserModel | null,
  userList: UserModel[]
}

export const initialState: State = {
  loggedUser: null,
  userList: []
}

export const userReducer = createReducer(
  initialState,
  on(UserActions.CreateUserAction, (state: State, {user}) => (
    {
      ...state,
      userList: state.userList.concat([user])
    }
  )),
  on(UserActions.LoginAction, (state: State, {user}) => (
    {
      ...state,
      loggedUser: user
    }
  )),
  on(UserActions.logout, (state: State) => (
    {
      ...state,
      loggedUser: null
    }
  )),
);
