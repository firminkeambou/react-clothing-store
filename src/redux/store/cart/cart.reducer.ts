import {
  addItemCartQuantity,
  addItemToCart,
  decreaseItemCartQuantity,
  removeItemFromCart,
  setIsCartOpen,
} from './cart.action';
import { CartItem } from './cart.action-types';
import { UnknownAction } from 'redux';
export type CartState = {
  readonly cartItems: CartItem[];

  readonly isCartOpen: boolean;
};
export const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
  /* no more needed as we will calculate them on the fly using selectors
  cartCount: 0,
  cartTotalPrice: 0,
  */
};
export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: UnknownAction
): CartState => {
  if (addItemToCart.match(action)) {
    // we just actually test out a property
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if (addItemCartQuantity.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  if (decreaseItemCartQuantity.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  if (removeItemFromCart.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  return state;
  /*
  old implementation  before type Script
  const { type, payload } = action; // Destructure type and payload from the action object
  switch (type) {
    case CART_ACTION_TYPES.ADD_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.ADD_CART_ITEMS_QUANTITY:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.DECREASE_CART_ITEMS_QUANTITY:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.REMOVE_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      }; */
  /*
      case CART_ACTION_TYPES.SET_CART_COUNT:
      return {
        ...state,
        cartCount: payload,
      };
    case CART_ACTION_TYPES.SET_CART_TOTAL_PRICE:
      return {
        ...state,
        cartTotalPrice: payload,
      };
      default:
      return state; // Return the current state if action type is not recognized,or have nothing to do with the current reducer as they will be combined. which is different of what we had before when we threw errors as each reducer was completed on its own, no need of combination

      */
};

//export default userReducer;
