export enum CATEGORIES_ACTION_TYPES { // enum == type of constants but with a fix value, and like a key/pair value
  //SET_CATEGORIES: 'category/SET_CATEGORIES', no longer needed as we are using redux-thunk now
  //the following property are for redux-thunk async handling if needed in the future
  FETCH_CATEGORIES_START = 'category/FETCH_CATEGORIES_START',
  FETCH_CATEGORIES_SUCCESS = 'category/FETCH_CATEGORIES_SUCCESS',
  FETCH_CATEGORIES_FAILED = 'category/FETCH_CATEGORIES_FAILED',
}

export type CategoryItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type Category = {
  title: string;
  items: CategoryItem[]; // meaning array of CategoryItem
};

// define a map type in type Script
export type CategoryMap = {
  [key: string]: CategoryItem[];
};

export default CATEGORIES_ACTION_TYPES;
