import { createContext, useEffect, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';
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
// using reducer is more complex but more powerful, for this simple case useState is enough
// user Reducer

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
};
const userReducer = (state, action) => {
  console.log('dispatching user action');
  console.log('User reducer action:', action);
  const { type, payload } = action; // Destructure type and payload from the action object
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type} in userReducer`); // Error handling for unrecognized action types
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  //const [currentUser, setCurrentUser] = useState(null); // State to hold the current user, initially set to null , this was used before useReducer
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE); // dispatch is a function used to send actions to the reducer
  const { currentUser } = state; // Destructure currentUser from the state object
  console.log('Current Initial User:', currentUser);
  // Function to update the currentUser state
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };
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
        //console.log('from onAuthStateChangedListener:', user);
      }
      setCurrentUser(user);
    });
    return unsubscribe; // Cleanup function to unsubscribe from the listener when the component unmounts
  }, []); // This effect runs when the component mounts and sets the currentUser to null initially
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
