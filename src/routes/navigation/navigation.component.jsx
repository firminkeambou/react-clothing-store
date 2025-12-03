import React from 'react';
import { useSelector } from 'react-redux'; // like useContext it allows us to interact with  redux store
import { Outlet } from 'react-router-dom';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import { Fragment } from 'react'; // used to wrap multiple elements without adding extra nodes to the DOM
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'; // custom SVG logo component, this allows us to use the SVG as a React component
//import { UserContext } from '../../contexts/user.context';
//import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to manage toggle state
import { signOutUser } from '../../utils/firebase/firebase.utils'; // Importing the signOutUser function to handle user sign out
import { selectCurrentUser } from '../../redux/store/user/user.selector';
//import './navigation.styles.scss'; // styles for the navigation component
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { selectIsCartOpen } from '../../redux/store/cart/cart.selector.js';
import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
} from './navigation.styles';
// <Link className='nav-link' to='/'> Home </Link>
//<Link className='nav-link' to='/contact'> Contact </Link>
const Navigation = () => {
  //const { currentUser } = useContext(UserContext); // Accessing or subscribing to the current user from UserContext
  // below is replacing useContext by useSelector
  // useSelector receives the whole state , therefore, we extract what we need
  const currentUser = useSelector(selectCurrentUser); // remember that at the end of the day, we have a single big object
  const isCartOpen = useSelector(selectIsCartOpen);
  //const { isCartOpen } = useContext(CartContext);
  //console.log('login user', currentUser); // Logging the current user to the console, this will be null if no user is signed in
  /*
    depended on user.context.jsx to update the currentUser state, so we don't need to use setCurrentUser here anymore, we can remove it from the UserContext
    const signOutHandler = async () => {
      const response = await signOutUser(); // Calls the signOutUser function to sign out the user correctly from Firebase. it returns undefined when correctly signed out,
      console.log('signOut response', response); // Logs the response from the signOutUser function, it should be undefined if successful
      // After signing out, we set the currentUser to null to update the state in User
      setCurrentUser(null);
   }
      */
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop"> SHOP </NavLink>
          {
            /** If currentUser is not null, then the user is signed in, so we show the SIGN OUT link */
            currentUser ? (
              <NavLink as="span" onClick={signOutUser}>
                {' '}
                SIGN OUT{' '}
              </NavLink>
            ) : (
              /** If currentUser is null, then the user is not signed in, so we show the SIGN IN link */
              <NavLink to="/auth"> SIGN IN </NavLink>
            )
          }
          {/** CartIcon component is used to show the cart icon in the navigation bar */}
          {/** It will show the number of items in the cart */}
          <CartIcon />
        </NavLinks>
        {/** If isCartOpen is true, then we show the CartDropdown component */}
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      {/** The Outlet component is used to render the child routes of the current route */}

      {/** In this case, it will render the Home component when the path matches '/' */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
