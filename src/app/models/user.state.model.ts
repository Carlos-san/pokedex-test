import { UserModel } from "./user.model";

export class UserStateModel {
  loggedUser?: UserModel = undefined;

  userList: UserModel[] = [];
}
