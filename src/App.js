import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component.jsx'; // Importing the Home component
import Navigation from './routes/navigation/navigation.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx'; // Importing the SignIn component
import CheckOut from './routes/check-out/check-out.component.jsx';
import Shop from './routes/shop/shop.component.jsx'; // Importing the Shop component
const App = () => {
  // the App component serves as the main entry point for the application
  // it imports and renders the Directory component which displays a list of category items

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        {/** The Navigation component is used to render the navigation bar */}
        {/** It also contains an Outlet component to render child routes */}
        {/** The Outlet component will render the child component when the beginning of the path matches '/' */}

        {/** Nested route == shop */}
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        {/** Nested route == sign-in */}
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<CheckOut />} />
      </Route>
    </Routes>
  );
};

export default App;
