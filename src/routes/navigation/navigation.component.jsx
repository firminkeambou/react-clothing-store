import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Fragment } from 'react'; // used to wrap multiple elements without adding extra nodes to the DOM
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'; // custom SVG logo component, this allows us to use the SVG as a React component
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils'; // Importing the signOutUser function to handle user sign out
import './navigation.styles.scss'; // styles for the navigation component

// <Link className='nav-link' to='/'> Home </Link>
//<Link className='nav-link' to='/contact'> Contact </Link>
const Navigation = () => {
  const { currentUser } = useContext(UserContext); // Accessing or subscribing to the current user from UserContext
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
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            {' '}
            SHOP{' '}
          </Link>
          {
            /** If currentUser is not null, then the user is signed in, so we show the SIGN OUT link */
            currentUser ? (
              <span className="nav-link" onClick={signOutUser}>
                {' '}
                SIGN OUT{' '}
              </span>
            ) : (
              /** If currentUser is null, then the user is not signed in, so we show the SIGN IN link */
              <Link className="nav-link" to="/auth">
                {' '}
                SIGN IN{' '}
              </Link>
            )
          }
        </div>
      </div>
      {/** The Outlet component is used to render the child routes of the current route */}

      {/** In this case, it will render the Home component when the path matches '/' */}
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
