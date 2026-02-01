import CATEGORIES_ACTION_TYPES, { Category } from './category.action-types';
import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher, // check out the status of the action type passed in(dispatched) with the type created by the action creator
} from '../../../utils/reducer/reducer.utils';

//import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
//preparing the new action for the store
//Each function in this page will be used by "UseDispatch" in the appropriate component to dispatch the action to the user reducer
// the final result of this code will generate an action with its associate payload that will dispatched later

// no longer needed as we are using redux-thunk now
/*
export const setCategories = (categoriesArray) => {
  // we usually pass a payload to the action
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray); //return action type and payload
};*/

// for typeScript, we define various types for enum variables as they are pretty different strings

export type FetchCategoriesStart =
  Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>; // this allows typeScript to define a specific generic type for "CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START"  as its structure is pretty weird

export type FetchCategoriesSuccess = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
  Category[]
>;

export type FetchCategoriesFailed = ActionWithPayload<
  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
  Error
>;
// the line below use union to fix the only categories "Category Reducer" can accept

export type CategoryAction =
  | FetchCategoriesStart
  | FetchCategoriesSuccess
  | FetchCategoriesFailed; // these are the only categories our reducer can accept; "|" this is the union symbol

//the below first function will trigger saga as "rootSaga" starts listening  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
//action creator
export const fetchCategoriesStart = withMatcher(
  (): FetchCategoriesStart =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
); // returns and object including "match"  method
//action creator
export const fetchCategoriesSuccess = withMatcher(
  (categoriesArray: Category[]): FetchCategoriesSuccess =>
    createAction(
      CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
      categoriesArray
    )
); // returns and object including "match"  method

// we just wrote "createAction" instead of  "createAction<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]> ", as they are infering it from the returned oobject
//action creator
export const fetchCategoriesFailed = withMatcher(
  (error: Error): FetchCategoriesFailed =>
    createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);

//let's decalare thunk function to fetch categories data from firebase and dispatch the result to the store
//this function will be used in the component via useDispatch hook
/*export const fetchCategoriesAsync = () => {
  // Async to remind us that this function is redux asynchronous
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocuments(); //getCategoriesAndDocuments('categories')
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error));
    }
  };
};*/
