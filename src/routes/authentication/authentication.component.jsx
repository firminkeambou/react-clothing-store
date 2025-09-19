import React from 'react';
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
// we can get rid of the following import as we no longer need getRedirectResult
import {
  auth,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx'; // Importing the SignUpForm component
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx';

import { AuthenticationContainer } from './authentication.styles.jsx';
const Authentication = () => {
  // This effect runs when the component mounts and checks if there is a redirect result from Google sign-in
  // If there is a result, it creates a user document in Firestore for the authenticated user
  // This is useful for handling cases where the user is redirected back to the app after signing in with Google, because when redirected,the component is unmounted and remounted back after redirect
  // This line is fired  when we click on the "Sign in with Google Redirect" button
  // and the user is redirected to the Google sign-in page, after signing in, the user is redirected back to the app
  // and the getRedirectResult function is called to get the result of the sign-in operation
  useEffect(() => {
    const getRedirectResultAsync = async () => {
      // not working at the moment, because it is not working with the latest version of Firebase
      const response = await getRedirectResult(auth); //auth is the Firebase auth instance,
      console.log(response); //
      if (response) {
        const userDocRef = await createUserDocumentFromAuth(response.user);
        console.log(userDocRef);
      }
    };
    getRedirectResultAsync();
  }, []); // empty dependency array means this effect runs once when the component mounts

  return (
    <AuthenticationContainer>
      <SignInForm />
      {/* <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
        </button> */}
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
