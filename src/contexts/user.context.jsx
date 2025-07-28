import { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChangedListener,
  signOutUser,
  createUserDocumentFromAuth,
} from '../utils/firebase/firebase.utils'; // Importing the onAuthStateChangedListener to listen for authentication state changes
//as the actual value you want to access in the context
// object passed to createContext will be the default value when no provider is found
export const UserContext = createContext({
  currentUser: null, // default value for currentUser
  setCurrentUser: () => null, // default function to set currentUser
  testVariable: 'test', // an additional variable to demonstrate context usage
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
  };
  // === signOutUser();?? leave it run?? // signOutUser is called here to ensure that the user is signed out when the UserProvider is initialized, we should think out when to call this function, as it will sign out the user immediately when the UserProvider is initialized(or we refresh the webpage), which is not the intended behavior in most cases.
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      //console.log('User state changed:', user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe; // Cleanup function to unsubscribe from the listener when the component unmounts
  }, []); // This effect runs when the component mounts and sets the currentUser to null initially
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
