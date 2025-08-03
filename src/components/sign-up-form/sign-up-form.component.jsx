import React, { useContext } from 'react';
import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
//import { UserContext } from '../../contexts/user.context'; // Importing the UserContext to access user state
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'; // imports the function to create a user document from authentication
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  // const {  setCurrentUser } = useContext(UserContext); // Accessing the UserContext to get the current user state and function to update it

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      //setCurrentUser(user); // Update the current user in UserContext

      // this will overwrite the user document in Firestore with the new user data
      // if the user document already exists, it will update the existing document with the new data given that onAuthStateChangedListener will have created the user document reference by the time we get here
      const userDocRef = await createUserDocumentFromAuth(user, {
        displayName,
      });
      // creates a user document in Firestore with the authenticated user and display name

      resetFormFields(); // resets the form fields to default after successful sign up
    } catch (error) {
      console.error('Error creating user', error);
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        alert('Error creating user', error);
      }
      return;
    }
  };
  const resetFormFields = () => {
    setFormFields(defaultFormFields); // resets the form fields to default
  };
  const handleChange = (event) => {
    const { name, value } = event.target; // destructuring the name and value from the event target
    setFormFields({ ...formFields, [name]: value }); // updating the form fields
    console.log(formFields); // logging the form fields to the console
  };

  return (
    <div className="sign-up-container">
      <h2> I do not have an account ? </h2>
      <span>Sign Up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name" // label for the input field
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName} // controlled input, value is set to displayName from formFields
          autoComplete="off" // prevents the browser from autofilling the input field
          required
        />

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

        <FormInput
          label="Confirm Password" // label for the input field
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword} // controlled input, value is set to confirmPassword from formFields
          autoComplete="off" // prevents the browser from autofilling the input field
          required
        />
        <Button buttonType="" type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};
export default SignUpForm;
