import USER_ACTION_TYPES from './user.action-types';

const INITIAL_STATE = {
  currentUser: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  //console.log('dispatching user action now using redux');
  //console.log('User reducer action  now using redux:', action);
  const { type, payload } = action; // Destructure type and payload from the action object
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state; // Return the current state if action type is not recognized,or have nothing to do with the current reducer as they will be combined. which is different of what we had before when we threw errors as each reducer was completed on its own, no need of combination
  }
};

//export default userReducer;
