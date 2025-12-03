import USER_ACTION_TYPES from './user.action-types';
import { createAction } from '../../../utils/reducer/reducer.utils';
//preparing the new action for the store
//Each function in this page will be used by "UseDispatch" in the appropriate component to dispatch the action to the user reducer
export const setCurrentUser = (user) => {
  return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user); //return action type and payload
};
