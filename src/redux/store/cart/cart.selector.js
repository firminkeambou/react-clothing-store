// this function is called by  by UseSelector() to get the current state or the user
// the selector is usually the place where you transform the state before it reaches the component depending on the form of the data get from the API

//PROBLEM
//because "reduce" function always returns a brand new object even if the content hasn't changed ,
//leaving this selector this way may cause unnecessary re-renders in the components that depend on this state
//the the new reference is returned whenever this selector is called
//SOLVING PROBLEM with createSelector
import { createSelector } from 'reselect';

const newCartCount = (cartitems) =>
  cartitems.reduce((total, item) => total + item.quantity, 0);
// total cost of the cart
const totCartPrice = (cartitems) =>
  cartitems.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.price),
    0
  );
//slicing the cart state from the whole state
// this is the input selector
// it returns the cart slice of the state

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer], //array of input selectors, what do I want to use as a part of the parameter of the output selector
  // this output selector only gets run if input selectors have changed
  (cartSlice) => cartSlice.cartItems // output selector ; categoriesSlice is the result gets from selectCategoryReducer: we can have as many parameters as the number of input selectors
);
//selector to get isCartOpen from the cart slice of the state
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);

// total price of the cart
export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) => totCartPrice(cartItems)
);
//total count(elts) of the cart
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  newCartCount(cartItems)
);

/** all code without memoization
 * 
 * export const selectCategoriesMap = (state) => {
  console.log('category selector fired');
  return state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
};
 */
