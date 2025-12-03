export const CART_ACTION_TYPES = {
  ADD_CART_ITEMS: 'cart/ADD_CART_ITEMS',
  ADD_CART_ITEMS_QUANTITY: 'cart/ADD_CART_ITEMS_QUANTITY',
  DECREASE_CART_ITEMS_QUANTITY: 'cart/DECREASE_CART_ITEMS_QUANTITY',
  REMOVE_CART_ITEMS: 'cart/REMOVE_CART_ITEMS',
  SET_IS_CART_OPEN: 'cart/SET_IS_CART_OPEN',
  // no more needed to dispatch those actions as we will calculate them on the fly using selectors
  //SET_CART_COUNT: 'cart/SET_CART_COUNT',
  // SET_CART_TOTAL_PRICE: 'cart/SET_CART_TOTAL_PRICE',
};

//export default CART_ACTION_TYPES;
