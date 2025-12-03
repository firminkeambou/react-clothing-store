// this function is called by  by UseSelector() to get the current state or the categories
// the selector is usually the place where you transform the state before it reaches the component depending on the form of the data got from the API

//PROBLEM
//because "reduce" function always returns a brand new object even if the content hasn't changed ,
//leaving this selector this way may cause unnecessary re-renders in the components that depend on this state
//the the new reference is returned whenever this selector is called
//SOLVING PROBLEM with createSelector
// we will use "reselect" library to memoize the output of this selector
//at the end of the day, we are composing selectors together (functions composition)
import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories; // the result s a categoriesSlice

export const selectCategories = createSelector(
  [selectCategoryReducer], //array of input selectors, what do I want to use as a part of the parameter of the output selector
  // this output selector only gets run if input selectors have changed
  (categoriesSlice) => categoriesSlice.categories // output selector ; categoriesSlice is the result gets from selectCategoryReducer: we can have as many parameters as the number of input selectors
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    console.log('category selector fired');
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

export const selectIsCategoriesLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
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
