import { Category } from './category.action-types';
//import CATEGORIES_ACTION_TYPES ./category.action-types,
import { UnknownAction } from 'redux';
import {
  //CategoryAction,
  fetchCategoriesStart,
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.action';
// as CATEGORIES_INITIAL_STATE is a constant , we don't actually need to define a type for it

export type CategorieState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null; // it can be Error or null
};
const CATEGORIES_INITIAL_STATE: CategorieState = {
  categories: [],
  //the following property are for redux-thunk async handling if needed in the future
  isLoading: false,
  error: null,
};

export const categoriesReducer = (
  state = CATEGORIES_INITIAL_STATE,
  // action = {}
  //action = {} as CategoryAction this implementation with discriminating union is no more accurare,as we want to control the type of action // this pattern is called a discriminating UNION, only one type out of  three in "CategoryAction" should be accepted at once
  action: UnknownAction // {} as UnknownAction
): CategorieState => {
  // console.log('dispatching Category actions ');
  // console.log('Category actions:', action);
  //const { type, payload } = action; // this line can no longer be used as in "CategoryAction", the action type "FetchCategoriesStart" does not have a payload

  if (fetchCategoriesStart.match(action)) {
    // we just actually test out a property
    return {
      ...state,
      isLoading: true,
    };
  }

  if (fetchCategoriesSuccess.match(action)) {
    return {
      ...state,
      categories: action.payload,
      isLoading: false,
    };
  }
  if (fetchCategoriesFailed.match(action)) {
    return {
      ...state,
      error: action.payload,
      isLoading: false,
    };
  }
  return state;
};

/* 


  //old implementation without type narrowing down
  switch (action.type) {
    //case CATEGORIES_ACTION_TYPES.SET_CATEGORIES: no longer needed as we are using redux-thunk now
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };
    case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state; // Return the current state if action type is not recognized,or have nothing to do with the current reducer as they will be combined. which is different of what we had before when we threw errors as each reducer was completed on its own, no need of combination
  } */

//export default userReducer;
