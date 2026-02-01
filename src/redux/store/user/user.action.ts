import USER_ACTION_TYPES from './user.action-types';
import {
  Action,
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../../utils/reducer/reducer.utils';
import { UserData } from '../../../utils/firebase/firebase.utils.types';
import { AuthError } from 'firebase/auth';
//preparing the new actions for the store
// defining types tobe used later
export type SetCurrentUser = ActionWithPayload<
  USER_ACTION_TYPES.SET_CURRENT_USER,
  UserData
>;

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>;

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>;

export type EMailSignInStart = ActionWithPayload<
  USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  {
    email: string;
    password: string;
  }
>;
export type SIgnInSuccess = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  UserData
>;
export type SIgnInFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_IN_FAILED,
  AuthError
  // Error & { code: string }
>;

export type CreateUserEmailPasswordStart = ActionWithPayload<
  USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_START,
  {
    email: string;
    password: string;
    displayName: string;
  }
>;
export type CreateUserEmailPasswordSuccess = ActionWithPayload<
  USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_SUCCESS,
  {
    email: string;
    displayName: string;
  }
>;

export type CreateUserEmailPasswordFailed = ActionWithPayload<
  USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_FAILED,
  AuthError
  //Error
>;

export type SignoutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;
export type SignoutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;
export type SignoutFailed = ActionWithPayload<
  USER_ACTION_TYPES.SIGN_OUT_FAILED,
  Error
>;
//////////////////////////
//Each function in this page will be used by "UseDispatch" in the appropriate component to dispatch the action to the user reducer
////////////////////////////
export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); //return action type and payload
}); // returns and object including "match"  method

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
); // fired to get user

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
); // returns and object including "match"  method

export const EmailSignInStart = withMatcher(
  (email: string, password: string): EMailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
);

export const SignInSuccess = withMatcher(
  (user: UserData & { id: string }): SIgnInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user) // we extended UserData with "& {id:string}" because it's required in SAGA, when dispatching "SignInSuccess" in SAGA
);

export const SignInFailed = withMatcher(
  //(error: Error & { code: string }): SIgnInFailed =>
  (error: AuthError): SIgnInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);
//
export const createUserEmailPasswordStart = withMatcher(
  (
    email: string,
    password: string,
    displayName: string
  ): CreateUserEmailPasswordStart =>
    createAction(USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_START, {
      email,
      password,
      displayName,
    })
);

export const createUserEmailPasswordSuccess = withMatcher(
  (email: string, displayName: string): CreateUserEmailPasswordSuccess =>
    createAction(USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_SUCCESS, {
      email,
      displayName,
    })
);

export const createUserEmailPasswordFailed = withMatcher(
  (error: AuthError): CreateUserEmailPasswordFailed =>
    createAction(USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_FAILED, error)
);

export const signoutStart = withMatcher(
  (): SignoutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);
export const signoutSuccess = withMatcher(
  (): SignoutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);
export const signoutFailed = withMatcher(
  (error: Error): SignoutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);
