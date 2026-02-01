import { Action, Middleware, UnknownAction } from 'redux';
import { RootState } from '../store';
import { addItemToCart } from '../cart/cart.action';

// custom middleware
/**
 *   if (addItemToCart.match(action)) {
     // we just actually test out a property
     return {
       ...state,
       cartItems: action.payload,
     };
   }
 */
export const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const specificAction = action as { type: string; payload: any }; // this line of code  is because  action is of type unknown
    if (!specificAction.type) return next(action);
    console.log('action type:', specificAction.type);
    console.log('payload:', specificAction.payload);
    console.log('current state:', store.getState());
    next(action); // pass the action to the next middleware or reducer, which will then run. if it's a root reducer for example, it will get executed
    console.log('next state:', store.getState());
  };
//end custom middleware
