import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home.component.jsx'; // Importing the Home component
import Navigation from './routes/navigation/navigation.component.jsx';
import Authentication from './routes/authentication/authentication.component.jsx'; // Importing the SignIn component
import CheckOut from './routes/check-out/check-out.component.jsx';
import Shop from './routes/shop/shop.component.jsx'; // Importing the Shop component

import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
} from './utils/firebase/firebase.utils'; // Importing the onAuthStateChangedListener to listen for authentication state changes
import { setCurrentUser } from './redux/store/user/user.action.js';

import { useDispatch } from 'react-redux';
/*export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};*/
const App = () => {
  // the App component serves as the main entry point for the application
  // it imports and renders the Directory component which displays a list of category items
  // === signOutUser();?? leave it run?? // signOutUser is called here to ensure that the user is signed out when the UserProvider is initialized, we should think out when to call this function, as it will sign out the user immediately when the UserProvider is initialized(or we refresh the webpage), which is not the intended behavior in most cases.
  const dispatch = useDispatch(); //it is generated only once and should be use by other components down the tree, the dispatch reference never changes, this is why we use dispatch at the top level of the App
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      //console.log('User state changed:', user);
      if (user) {
        createUserDocumentFromAuth(user);
        //console.log('from onAuthStateChangedListener:', user);
      }
      //dispatching actions to root dispatcher which then pass it down to other reducers
      //console.log('action triggered', USER_ACTION_TYPES.SET_CURRENT_USER);
      //console.log('user received', user);
      //console.log('action dispatched ::', ); // Dispatching the action to set the current user in the Redux store

      dispatch(setCurrentUser(user)); //
    });
    return unsubscribe; // Cleanup function to unsubscribe from the listener when the component unmounts
  }, [dispatch]); // This effect runs when the component mounts and sets the currentUser to null initially and whenever the reference to dispatch changes, it will re-run // in fact, there is no point using dispatch here as with redux, it never changes

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
