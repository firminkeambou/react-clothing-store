import { ChangeEvent, FormEvent, useState } from 'react';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
//import { UserContext } from '../../contexts/user.context.jsx'; // Importing the UserContext to access user state
import { AuthErrorCodes } from 'firebase/auth';
import {
  googleSignInStart,
  EmailSignInStart,
} from '../../redux/store/user/user.action';
/*import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils.js';*/
import { useSelector } from 'react-redux';
import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { useDispatch } from 'react-redux';
import {
  selectErrorLogin,
  selectLoginSuccess,
} from '../../redux/store/user/user.selector';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const errorSignIn = useSelector(selectErrorLogin);
  const signinSuccess = useSelector(selectLoginSuccess);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  console.log('Error Free', errorSignIn);
  //const { setCurrentUser } = useContext(UserContext); // Destructuring to get currentUser and setCurrentUser from UserContext

  const singnInWithGoogle = async () => {
    //await signInWithGooglePopup();
    //console.log('Button Clic;ked')
    dispatch(googleSignInStart());
    //setCurrentUser(user);no more needed ,we now relies on the onAuthStateChangedListener in user.context.jsx to update the currentUser state. we should even remove anything related to useContext from this component
    //console.log(user);
    //const userDocRef = await createUserDocumentFromAuth(user); // this method needs the authenticated user, so it can creates a document
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle sign in with email and password
    try {
      dispatch(EmailSignInStart(email, password));
      /*const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );*/
      //from userContext, the below line is possible
      //<setCurrentUser(user); // we now relies on the onAuthStateChangedListener in user.context.jsx to update the currentUser state. we should even remove anything related to useContext from this component
      // console.log(user);
      resetFormFields();
    } catch (error) {
      console.error('Error signing in', error);
      /*if (error.code === 'auth/invalid-credential') {
        alert('Invalid email or password');
      } else {
        alert('Error signing in', error);
      }*/
      return;
    }
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields); // resets the form fields to default
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  //console.log (email, password)
  return (
    <SignInContainer>
      <h2> I already have an account ? </h2>
      <span>Sign In with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email" // label for the input field
          type="email"
          onChange={handleChange}
          name="email"
          value={email} // controlled input, value is set to email from formFields
          autoComplete="off" // prevents the browser from autofilling the input field
          required
        />

        <FormInput
          label="Password" // label for the input field
          type="password"
          onChange={handleChange}
          name="password"
          value={password} // controlled input, value is set to password from formFields
          autoComplete="off" // prevents the browser from autofilling the input field
          required
        />
        <div style={{ paddingBottom: 24 }}>
          {errorSignIn &&
            errorSignIn.code &&
            errorSignIn.code === AuthErrorCodes.INVALID_IDP_RESPONSE && ( //'auth/invalid-credential' replaced by error code from firebase
              <span style={{ color: 'red', fontSize: 28 }}>
                Invalid email or password
              </span>
            )}

          {errorSignIn &&
            errorSignIn.code &&
            errorSignIn.code !== AuthErrorCodes.INVALID_IDP_RESPONSE && ( //'auth/invalid-credential' replaced by error code from firebase
              <span style={{ color: 'red', fontSize: 28 }}>
                Error signing in
              </span>
            )}

          {signinSuccess && (
            <span style={{ color: 'green', fontSize: 28 }}>
              successfully sign in
            </span>
          )}
        </div>
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={singnInWithGoogle}
          >
            Sign In with Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
