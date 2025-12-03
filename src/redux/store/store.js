// our states will leave here
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux'; // because createStore is deprecated

import logger from 'redux-logger'; // logger helps us to see what actions look like before and after a dispatch in the browser console
import rootReducer from './root-reducer'; // our root reducer

// custom middleware
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log('action type:', action.type);
  console.log('payload:', action.payload);
  console.log('current state:', store.getState());
  next(action); // pass the action to the next middleware or reducer, which will then run. if it's a root reducer for example, it will get executed
  console.log('next state:', store.getState());
};
//end custom middleware

const middlewares = [loggerMiddleware]; // middleware array , run before the action reaches the reducer, it especially allows us to have track of of states via the browser console

// if we are in development mode add logger middleware
/*if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
*/
const composedEnhancers = compose(applyMiddleware(...middlewares)); // composing our middleware; compose allow us to pass functions from left to the right
// creating the store, it is a single source of truth
export const store = createStore(
  rootReducer, // updating store(states) to use the persisted reducer, no more rootReducer as we want to persist only a part of our store
  undefined,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // this is for redux devtools extension in the browser
  composedEnhancers // runs before the rootReducer itself
);
// creating the persistor which persists and rehydrates the store
