import { createSelector } from '@ngrx/store';
import * as fromUsers from './user.reducers';

export interface AppState {
  user: fromUsers.State
}

export const selectorUser = (state: AppState) => state.user;

export const selectCurrentUser = createSelector(
  selectorUser,
  (state: fromUsers.State) => state.loggedUser
);

export const selectUserList = createSelector(
  selectorUser,
  (state: fromUsers.State) => state.userList
);
