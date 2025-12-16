import CATEGORIES_ACTION_TYPES from './category.action-types';
import { createAction } from '../../../utils/reducer/reducer.utils';
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

//the below first function will trigger saga as "rootSaga" starts listening  CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START
export const fetchCategoriesStart = () =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);

export const fetchCategoriesSuccess = (categoriesArray) =>
  createAction(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    categoriesArray
  );

export const fetchCategoriesFailed = (error) =>
  createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);

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
