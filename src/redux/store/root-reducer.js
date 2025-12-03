import { combineReducers } from 'redux';
import { userReducer } from './user/user.reducer';
import { categoriesReducer } from './categories/category.reducer';
import { cartReducer } from './cart/cart.reducer';
export const rootReducer = combineReducers({
  // your individual reducers go here
  user: userReducer,
  categories: categoriesReducer,
  cart: cartReducer,
}); // combining all reducers because redux only supports one reducer and it is a single source of truth

export default rootReducer;
