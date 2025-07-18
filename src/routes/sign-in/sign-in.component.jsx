import React from 'react'
import { signInWithGooglePopup,createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils.js';

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    console.log(user);
    createUserDocumentFromAuth(user);
  }
  return (
    <div>
        <h1>SignIn Page</h1>
        <button onClick={logGoogleUser}>
                Sign in with Google Popup
        </button>
    </div>
  )
}

export default SignIn