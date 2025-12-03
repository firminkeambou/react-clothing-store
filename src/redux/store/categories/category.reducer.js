import CATEGORIES_ACTION_TYPES from './category.action-types';

const CATEGORIES_INITIAL_STATE = {
  categories: [],
  //the following property are for redux-thunk async handling if needed in the future
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  action = {}
) => {
  // console.log('dispatching Category actions ');
  // console.log('Category actions:', action);
  const { type, payload } = action; // Destructure type and payload from the action object
  switch (type) {
    //case CATEGORIES_ACTION_TYPES.SET_CATEGORIES: no longer needed as we are using redux-thunk now
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: payload,
        isLoading: false,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: payload,
        isLoading: false,
      };
    default:
      return state; // Return the current state if action type is not recognized,or have nothing to do with the current reducer as they will be combined. which is different of what we had before when we threw errors as each reducer was completed on its own, no need of combination
  }
};

//export default userReducer;
