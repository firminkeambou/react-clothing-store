import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/user.context'; // Importing the UserProvider context to manage user state  == the main idea here is to get access to thee current state of the user, and the function to update it across the application
import { ProductsProvider } from './contexts/products.context';
import { CartProvider } from './contexts/cart.context'; // Importing the ToggleProvider context to manage toggle state
import App from './App'; // Importing the main App component
//import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            {/** The UserProvider component wraps the App component to provide user context to the entire application */}
            {/** This allows any component within the App to access the current user state and update it */}
            <App />
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
