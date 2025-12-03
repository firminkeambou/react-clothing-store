import CATEGORIES_ACTION_TYPES from './category.action-types';
import { createAction } from '../../../utils/reducer/reducer.utils';
//preparing the new action for the store
//Each function in this page will be used by "UseDispatch" in the appropriate component to dispatch the action to the user reducer
// the final result of this code will generate an action with its associate payload that will dispatched later
export const setCategories = (categoriesArray) => {
  // we usually pass a payload to the action
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray); //return action type and payload
};
