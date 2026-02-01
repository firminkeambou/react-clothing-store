import { UserData } from '../../../utils/firebase/firebase.utils.types';
import { RootState } from '../store';
import { CurrentCreatedUser, UserState } from './user.reducer';
import { createSelector } from 'reselect';
import { AuthError } from 'firebase/auth';
const selectUserReducer = (state: RootState): UserState => state.user;
// this function is called by  by UseSelector() to get the current state or the user

export const selectCurrentUser = createSelector(
  selectUserReducer, //array of input selectors, or we can have a single selector,what do I want to use as a part of the parameter of the output selector
  // this output selector only gets run if input selectors have changed
  (UserSlice: UserState): UserData | null => UserSlice.currentUser // output selector ; categoriesSlice is the result gets from selectCategoryReducer: we can have as many parameters as the number of input selectors
);
export const selectErrorLogin = createSelector(
  selectUserReducer,
  //(UserSlice: UserState): (Error & { code: string }) | null =>
  (UserSlice: UserState): AuthError | null => UserSlice.errorSignIn
);

export const selectLoginSuccess = createSelector(
  selectUserReducer,
  (UserSlice: UserState): boolean => UserSlice.loginSuccess
);
export const selectErrorSignUP = createSelector(
  selectUserReducer,
  (UserSlice: UserState): AuthError | null => UserSlice.errorSignUP
);
export const selectUserCreationSuccess = createSelector(
  selectUserReducer,
  (UserSlice: UserState): boolean => UserSlice.successUserCreation
);
export const selectUserCreated = createSelector(
  selectUserReducer,
  (UserSlice: UserState): CurrentCreatedUser | null =>
    UserSlice.currentCreatedUser
);
//export const selectCurrentUser = (state): UserData => state.user.currentUser;
//export const selectErrorLogin = (state): Error => state.user.errorSignIn;
//export const selectLoginSuccess = (state): boolean => state.user.loginSuccess;
//export const selectErrorSignUP = (state): Error => state.user.errorSignUP;
/* export const selectUserCreationSuccess = (state): boolean =>
  state.user.successUserCreation;
export const selectUserCreated = (state): CurrentCreatedUser =>
  state.user.currentCreatedUser; */
