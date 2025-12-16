// our states will leave here
import {
  compose,
  legacy_createStore as createStore,
  applyMiddleware,
} from 'redux'; // because createStore is deprecated

import { persistStore, persistReducer } from 'redux-persist'; // to persist our store on the browser storage
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for any web browser
import logger from 'redux-logger'; // logger helps us to see what actions look like before and after a dispatch in the browser console, should be used only in development mode
import { loggerMiddleware } from './middleware/loggers'; // our custom logger middleware
import rootReducer from './root-reducer'; // our root reducer
//import { thunk } from 'redux-thunk'; // to handle async actions in redux
import createSagaMiddleware from 'redux-saga'; // saga middleware to handle async actions, more powerful than thunk, but run after reducers hit the store
import { rootSaga } from './root-saga'; // our root saga

//config object for redux-persist, only needed if we want to persist our store
const persistConfig = {
  key: 'root', // key for the local storage, the top level of our state object
  storage, // storage method , default is local storage for any web browser
  //blacklist: ['user'], // which reducer we don't want to persist, we don't want to persist user for security reasons and because we are using firebase auth which handles user session for us
  whitelist: ['cart'], //  whitelist = which reducer we want to persist ;'categories' reducer is no longer included because we are re-fetching it from the backend whenever the app loads, and the spinner shows while loading, also, we don't want the end user to see what he shouldn't see
};

// creating the saga middleware
const sagaMiddleware = createSagaMiddleware();

// defining a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
//yarn start lead to development mode, yarn build lead to production mode
// setting up middleware array
const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
  sagaMiddleware,
].filter(Boolean); //middleware/ filter boolean values from the middleware array (take out booleans values), run before the action reaches the reducer, it especially allows us to have track of of states via the browser console

//the below line enable redux devtools extension in the browser
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose; // to use redux devtools extension in the browser
// if we are in development mode add logger middleware

/*if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}*/

const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares)); // composing our middleware; compose allow us to pass functions from left to the right
// creating the store, it is a single source of truth
export const store = createStore(
  persistedReducer, // updating store(states) to use the persisted reducer, no more "rootReducer" as we want to persist only a part of our store
  undefined,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // this is for redux devtools extension in the browser
  composedEnhancers // runs before the rootReducer itself
);

// running the root saga
//defining watchers or actions to listing to during the use of the App
sagaMiddleware.run(rootSaga); // runs after the action hits the store, w

// creating the persistor which persists and rehydrates the store
export const persistor = persistStore(store); // this is used in the index.js file to wrap our app with PersistGate
