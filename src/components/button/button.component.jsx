import React from 'react';
//import {} from './button.styles.jsx';
//object definining possible classes for a button
import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
} from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in', // each key here is a type of button
  inverted: 'inverted',
};
//the below function simply returns a map object  that maps button types to their respective styled components
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};

const Button = ({ children, buttonType, ...otherProps }) => {
  const CustomButton = getButton(buttonType); // gets the appropriate button component based on the buttonType prop
  return <CustomButton {...otherProps}>{children}</CustomButton>;
};

export default Button;

/*
  Button component that renders different button styles based on the buttonType prop.
  Uses styled-components for styling.
      <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
*/
