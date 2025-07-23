import {useState} from 'react'
import FormInput from '../form-input/form-input.component.jsx';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
 } from '../../utils/firebase/firebase.utils.js';
import './sign-in-form.styles.scss'
import Button from '../button/button.component.jsx';

const defaultFormFields = {
   email: '',
   password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const singnInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    //console.log(user);
    const userDocRef = await createUserDocumentFromAuth(user); // this method needs the authenticated user, so it can creates a document
   }
   const handleSubmit = async (e) => {
     e.preventDefault();
     // Handle sign in with email and password
    try {
        const { user } = await signInAuthUserWithEmailAndPassword(email, password);
        console.log(user);
        resetFormFields();
    } catch (error) {
        console.error("Error signing in", error);
        if (error.code === 'auth/invalid-credential') {
            alert('Invalid email or password');
        } else {
            alert('Error signing in', error);
        }
        return;
    }

   }
 
   const resetFormFields = () => {
       setFormFields(defaultFormFields); // resets the form fields to default
  }
   const handleChange = (e) => {
     const { name, value } = e.target;
     setFormFields({ ...formFields, [name]: value });
   }
   //console.log (email, password)
  return (
    <div className='sign-in-form-container'>
        <h2> I already have an account ? </h2>
        <span>Sign In with your email and password</span>
        <form onSubmit={handleSubmit}>

         
          <FormInput 
            label="Email" // label for the input field
            type="email" 
            onChange={handleChange} 
            name='email' 
            value={email} // controlled input, value is set to email from formFields
            autoComplete="off" // prevents the browser from autofilling the input field
            required 
          />
        
          <FormInput 
            label="Password" // label for the input field
            type="password" 
            onChange={handleChange} 
            name='password' 
            value={password} // controlled input, value is set to password from formFields
            autoComplete="off" // prevents the browser from autofilling the input field
            required 
          />
        
        <div className='buttons-container'>
            <Button  type="submit">Sign In</Button>
            <Button type='button' buttonType='google' onClick={singnInWithGoogle}>Sign In with Google</Button>
        </div>
         
        </form>
    </div>
  )
}

export default SignInForm