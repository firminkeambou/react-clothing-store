import { UnknownAction } from 'redux';
import { UserData } from '../../../utils/firebase/firebase.utils.types';
//import USER_ACTION_TYPES from './user.action-types';
import { AuthError } from 'firebase/auth';
import {
  createUserEmailPasswordFailed,
  createUserEmailPasswordSuccess,
  SignInFailed,
  SignInSuccess,
  signoutFailed,
  signoutSuccess,
} from './user.action';

export type CurrentCreatedUser = {
  email: string;
  displayName: string;
};
export type UserState = {
  readonly currentUser: UserData | null;
  readonly isLoading: boolean;
  //readonly errorSignIn: (Error & { code: string }) | null;
  readonly errorSignIn: AuthError | null;
  readonly errorSignUP: AuthError | null;
  readonly errorSignOut: Error | null;
  readonly loginSuccess: boolean;
  readonly successUserCreation: boolean;
  readonly currentCreatedUser: CurrentCreatedUser | null;
};

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  errorSignIn: null,
  errorSignUP: null,
  errorSignOut: null,
  loginSuccess: false,
  successUserCreation: false,
  currentCreatedUser: null, // the just created user
};

export const userReducer = (
  state = INITIAL_STATE,
  action: UnknownAction
): UserState => {
  //console.log('dispatching user action now using redux');
  //console.log('User reducer action  now using redux:', action);
  // all these "if" replacing a switch statement is because when an action is dispatched, every single reducer will try to respond  to it no matter the action that was dispatched, therefore we need to check if it's the right action we are  responding to
  if (SignInSuccess.match(action)) {
    // we just actually test out a property
    return {
      ...state,
      currentUser: action.payload,
      errorSignIn: null,
      loginSuccess: true,
    };
  }
  if (SignInFailed.match(action)) {
    return {
      ...state,
      errorSignIn: action.payload,
      loginSuccess: false,
    };
  }
  if (createUserEmailPasswordSuccess.match(action)) {
    return {
      ...state,
      errorSignUP: null,
      successUserCreation: true,
      currentCreatedUser: action.payload,
    };
  }
  if (createUserEmailPasswordFailed.match(action)) {
    return {
      ...state,
      errorSignUP: action.payload,
      successUserCreation: false,
      currentCreatedUser: null,
    };
  }
  if (signoutSuccess.match(action)) {
    return {
      ...state,
      currentUser: null,
    };
  }
  if (signoutFailed.match(action)) {
    return {
      ...state,
      errorSignOut: action.payload,
    };
  }
  return state;

  /* const { type, payload } = action; // Destructure type and payload from the action object
  switch (type) {
    case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: payload,
        errorSignIn: null,
        loginSuccess: true,
      };
    case USER_ACTION_TYPES.SIGN_IN_FAILED:
      return {
        ...state,
        errorSignIn: payload,
        loginSuccess: false,
      };

    case USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_SUCCESS:
      return {
        ...state,
        errorSignUP: null,
        successUserCreation: true,
        currentCreatedUser: payload,
      };
    case USER_ACTION_TYPES.CREATE_USER_EMAIL_PASSWORD_FAILED:
      return {
        ...state,
        errorSignUP: payload,
        successUserCreation: false,
        currentCreatedUser: null,
      };
    case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
      };
    case USER_ACTION_TYPES.SIGN_OUT_FAILED:
      return {
        ...state,
        errorSignOut: payload,
      };
    default:
      return state; // Return the current state if action type is not recognized,or have nothing to do with the current reducer as they will be combined. which is different of what we had before when we threw errors as each reducer was completed on its own, no need of combination
  } */
};

//export default userReducer;
