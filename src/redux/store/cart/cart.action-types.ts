// an enum type declare  possible fixed values a variable can take

import { CategoryItem } from '../categories/category.action-types';

/* 
export const CART_ACTION_TYPES = {
  ADD_CART_ITEMS: 'cart/ADD_CART_ITEMS',
  ADD_CART_ITEMS_QUANTITY: 'cart/ADD_CART_ITEMS_QUANTITY',
  DECREASE_CART_ITEMS_QUANTITY: 'cart/DECREASE_CART_ITEMS_QUANTITY',
  REMOVE_CART_ITEMS: 'cart/REMOVE_CART_ITEMS',
  SET_IS_CART_OPEN: 'cart/SET_IS_CART_OPEN',
  // no more needed to dispatch those actions as we will calculate them on the fly using selectors
  //SET_CART_COUNT: 'cart/SET_CART_COUNT',
  // SET_CART_TOTAL_PRICE: 'cart/SET_CART_TOTAL_PRICE',
}; */

// new declaration of CART_ACTION_TYPES , possible values CART_ACTION_TYPES can take
// an enum type declare  possible fixed values(constants) a variable can take

export enum CART_ACTION_TYPES {
  ADD_CART_ITEMS = 'cart/ADD_CART_ITEMS',
  ADD_CART_ITEMS_QUANTITY = 'cart/ADD_CART_ITEMS_QUANTITY',
  DECREASE_CART_ITEMS_QUANTITY = 'cart/DECREASE_CART_ITEMS_QUANTITY',
  REMOVE_CART_ITEMS = 'cart/REMOVE_CART_ITEMS',
  SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
}
export type CartItem = CategoryItem & { quantity: number }; //one implementation of CartItem different from the one below using CategoryItem,  the finest because if caregoryItem Changes, CartItem will change as well
/* export type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}; */

//export default CART_ACTION_TYPES;
