import { CART_ACTION_TYPES } from './cart.action-types';
import { createAction } from '../../../utils/reducer/reducer.utils';
//preparing the new action for the store
//Each function in this page will be used by "UseDispatch" in the appropriate component to dispatch the action to the user reducer
// the final result of this code will generate an action with its associate payload that will dispatched later

///////////////helpers functions if needed //////////////////////

/*const newCartCount = (cartitems) =>
  cartitems.reduce((total, item) => total + item.quantity, 0);
// total cost of the cart
const totCartPrice = (cartitems) =>
  cartitems.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.price),
    0
  );*/

///------------------------------
const addCartItem = (cartItems, productToAdd) => {
  // Check if the item already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If the item exists, update its quantity
  // If it doesn't exist, add it to the cart with a quantity of 1
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const addCartItemQuantity = (cartItems, productId) => {
  // Check if the item already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productId
  );
  // If the item exists, update its quantity
  // If it doesn't exist, add it to the cart with a quantity of 1
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }
};

const decreaseCartItemQuantity = (cartItems, productId) => {
  // Check if the item already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productId
  );

  // If the item exists and is removable(quantity==1), remove it from the cart

  if (existingCartItem.quantity === 1) {
    //window.confirm('Are you sure you want to remove this item?');
    return cartItems.filter((cartItem) => cartItem.id !== productId);
  }

  // If the item exists, update its quantity
  // If it doesn't exist, add it to the cart with a quantity of 1
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productId && cartItem.quantity > 0
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};
// a helper function to remove an item from the cart
const removeItem = (cartItems, itemId) => {
  const filteredCartItems = cartItems.filter((item) => item.id !== itemId);
  return filteredCartItems;
};

//========================= CART ACTION CREATORS =========================//
export const setIsCartOpen = (currentStatus) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, !currentStatus);
};

/*const setCartItems = (newCartItems) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};*/

//cartItems will come from the store
export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.ADD_CART_ITEMS, newCartItems);
};
//cartItems will come from the store addItemCartQuantity
export const addItemCartQuantity = (cartItems, productId) => {
  const newCartItems = addCartItemQuantity(cartItems, productId);
  return createAction(CART_ACTION_TYPES.ADD_CART_ITEMS_QUANTITY, newCartItems);
};

export const decreaseItemCartQuantity = (cartItems, productId) => {
  const newCartItems = decreaseCartItemQuantity(cartItems, productId);
  return createAction(
    CART_ACTION_TYPES.DECREASE_CART_ITEMS_QUANTITY,
    newCartItems
  );
};

export const removeItemFromCart = (cartItems, itemId) => {
  const newCartItems = removeItem(cartItems, itemId);
  return createAction(CART_ACTION_TYPES.REMOVE_CART_ITEMS, newCartItems);
};
