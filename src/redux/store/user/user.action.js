import USER_ACTION_TYPES from './user.action-types';
import { createAction } from '../../../utils/reducer/reducer.utils';
//preparing the new action for the store
//Each function in this page will be used by "UseDispatch" in the appropriate component to dispatch the action to the user reducer
export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); //return action type and payload
};

export const checkUserSession = () =>
  createAction(USER_ACTION_TYPES.CHECK_USER_SESSION); // fired to get user
export const googleSignInStart = () =>
  createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);
export const EmailSignInStart = (email, password) =>
  createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });
export const SignInSuccess = (user) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);
export const SignInFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);
//
export const createUserEmailPasswordStart = (email, password, displayName) =>
  createAction(USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_START, {
    email,
    password,
    displayName,
  });
export const createUserEmailPasswordSuccess = (email, displayName) =>
  createAction(USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_SUCCESS, {
    email,
    displayName,
  });
export const createUserEmailPasswordFailed = (error) =>
  createAction(USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_FAILED, error);

export const signoutStart = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_START);
export const signoutSuccess = () =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);
export const signoutFailed = (error) =>
  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);
