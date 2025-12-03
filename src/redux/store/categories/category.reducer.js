import CATEGORIES_ACTION_TYPES from './category.action-types';

const CATEGORIES_INITIAL_STATE = {
  categories: [],
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  // console.log('dispatching Category actions ');
  // console.log('Category actions:', action);
  const { type, payload } = action; // Destructure type and payload from the action object
  switch (type) {
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      return state; // Return the current state if action type is not recognized,or have nothing to do with the current reducer as they will be combined. which is different of what we had before when we threw errors as each reducer was completed on its own, no need of combination
  }
};

//export default userReducer;
