import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store/store'; // Importing the Redux store to provide it to the React application
//import { UserProvider } from './contexts/user.context'; // Importing the UserProvider context to manage user state  == the main idea here is to get access to thee current state of the user, and the function to update it across the application
//import { CategoriesProvider } from './contexts/categories.context';
//import { CartProvider } from './contexts/cart.context'; // Importing the ToggleProvider context to manage toggle state
import App from './App'; // Importing the main App component
import { PersistGate } from 'redux-persist/integration/react'; // to delay the rendering of the app's UI until the persisted state has been retrieved and saved to redux store
import { persistor } from './redux/store/store'; // importing the persistor to be used with PersistGate
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {' '}
        {/*loading can be a spinner (<Spinner /> or component) or null */}
        <BrowserRouter>
          {/*<UserProvider> we comment this out because redux is going to take over  and we need to find a way to handle it, as UserProvider was at the top, we take the useEffect from UserProvider and use it at the very Top of the App component*/}
          {/* <CategoriesProvider> we comment this out because redux is going to take over */}
          {/* <CartProvider> we comment this out because redux is going to take over */}

          {/** The UserProvider component wraps the App component to provide user context to the entire application */}
          {/** This allows any component within the App to access the current user state and update it */}
          <App />
          {/* </CartProvider> we comment this out because redux is going to take over */}
          {/* </CategoriesProvider> we comment this out because redux is going to take over */}
          {/* </UserProvider>we comment this out because redux is going to take over */}
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
