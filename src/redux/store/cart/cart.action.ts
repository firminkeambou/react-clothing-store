import { CART_ACTION_TYPES } from './cart.action-types';
import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from '../../../utils/reducer/reducer.utils';
import { CartItem } from './cart.action-types';
import { CategoryItem } from '../categories/category.action-types';
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
// definition of action types from enum to be used with typeScript

//definition of types and functions to be used in the reducer for each enum variable
//-- begin "addCartItems" ---
export type AddCartItems = ActionWithPayload<
  CART_ACTION_TYPES.ADD_CART_ITEMS,
  CartItem[]
>;
/* to be deleted 
export const addCartItems = withMatcher(
  (cartItems: CartItem[]): AddCartItems =>
    createAction(CART_ACTION_TYPES.ADD_CART_ITEMS, cartItems)
); */
//-- end "addCartItems" ---
//-- begin "AddCartItemsQuantity" ---
export type AddCartItemsQuantity = ActionWithPayload<
  CART_ACTION_TYPES.ADD_CART_ITEMS_QUANTITY,
  CartItem[]
>;
/* to be deleted
 export const addCartItemsQuantity = withMatcher(
  (cartItems: CartItem[]): AddCartItemsQuantity =>
    createAction(CART_ACTION_TYPES.ADD_CART_ITEMS_QUANTITY, cartItems)
); */
//-- end "AddCartItemsQuantity" -----
//-- begin "DecreaseCartItemsQuantity" ---
export type DecreaseCartItemsQuantity = ActionWithPayload<
  CART_ACTION_TYPES.DECREASE_CART_ITEMS_QUANTITY,
  CartItem[]
>;
/* export const decreaseCartItemsQuantity = withMatcher(
  (cartItems: CartItem[]): DecreaseCartItemsQuantity =>
    createAction(CART_ACTION_TYPES.DECREASE_CART_ITEMS_QUANTITY, cartItems)
); */
//-- end "DecreaseCartItemsQuantity" -----
//-- begin "RemoveCartItems" ---
export type RemoveCartItems = ActionWithPayload<
  CART_ACTION_TYPES.REMOVE_CART_ITEMS,
  CartItem[]
>;
/* export const removeCartItems = withMatcher(
  (cartItems: CartItem[]): RemoveCartItems =>
    createAction(CART_ACTION_TYPES.REMOVE_CART_ITEMS, cartItems)
); */
//-- end "RemoveCartItems" -----
//-- begin "SetIsCartOPen" ---
export type SetIsCartOPen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;
/* export const setIsCartOPen = withMatcher(
  (isCartOpen: boolean): SetIsCartOPen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)
); */
//-- end "SetIsCartOPen" -----
///------------------------------
const addCartItem = (
  cartItems: CartItem[] = [],
  productToAdd: CategoryItem
): CartItem[] => {
  // Check if the item already exists in the cart
  //if (Array.isArray(cartItems) ) {

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
  //}
  return [...cartItems, { ...productToAdd, quantity: 1 }];
  // }
  // return [...cartItems]
};

const addCartItemQuantity = (
  cartItems: CartItem[] = [],
  productId: number
): CartItem[] => {
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
  return [...cartItems];
};

const decreaseCartItemQuantity = (
  cartItems: CartItem[] = [],
  productId: number
): CartItem[] => {
  // Check if the item already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productId
  );

  // If the item exists and is removable(quantity==1), remove it from the cart

  if (existingCartItem?.quantity === 1) {
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
  return [...cartItems];
};
// a helper function to remove an item from the cart
const removeItem = (cartItems: CartItem[] = [], itemId: number): CartItem[] => {
  const filteredCartItems = cartItems.filter((item) => item.id !== itemId);
  return filteredCartItems;
};

//========================= CART ACTION CREATORS =========================//
/* old implementation without withMatcher 

export const setIsCartOpen = (currentStatus: boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, !currentStatus);
}; */

export const setIsCartOpen = withMatcher(
  (isCartOpen: boolean): SetIsCartOPen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, !isCartOpen)
);
/*const setCartItems = (newCartItems) => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};*/

//cartItems will come from the store
export const addItemToCart = withMatcher(
  (cartItems: CartItem[], productToAdd: CategoryItem): AddCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.ADD_CART_ITEMS, newCartItems);
  }
);
//cartItems will come from the store addItemCartQuantity
export const addItemCartQuantity = withMatcher(
  (cartItems: CartItem[], productId: number): AddCartItemsQuantity => {
    const newCartItems = addCartItemQuantity(cartItems, productId);
    return createAction(
      CART_ACTION_TYPES.ADD_CART_ITEMS_QUANTITY,
      newCartItems
    );
  }
); //returns and object including "match"  method

export const decreaseItemCartQuantity = withMatcher(
  (cartItems: CartItem[], productId: number): DecreaseCartItemsQuantity => {
    const newCartItems = decreaseCartItemQuantity(cartItems, productId);
    return createAction(
      CART_ACTION_TYPES.DECREASE_CART_ITEMS_QUANTITY,
      newCartItems
    );
  }
); // returns and object including "match"  method

export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], itemId: number): RemoveCartItems => {
    const newCartItems = removeItem(cartItems, itemId);
    return createAction(CART_ACTION_TYPES.REMOVE_CART_ITEMS, newCartItems);
  }
);

/// action related to saga
