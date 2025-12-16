import USER_ACTION_TYPES from './user.action-types';

const INITIAL_STATE = {
  currentUser: null,
  isLoading: false,
  errorSignIn: null,
  errorSignUP: null,
  errorSignOut: null,
  loginSuccess: false,
  successUserCreation: false,
  currentCreatedUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  //console.log('dispatching user action now using redux');
  //console.log('User reducer action  now using redux:', action);
  const { type, payload } = action; // Destructure type and payload from the action object
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
  }
};

//export default userReducer;
