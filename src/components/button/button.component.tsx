import React, { ButtonHTMLAttributes, ReactNode } from 'react';
//import {} from './button.styles.jsx';
//object definining possible classes for a button
//ButtonHTMLAttributes ; Button HTML elements attributes
import { FC } from 'react'; // FC stands for Functional Component
import {
  BaseButton,
  InvertedButton,
  GoogleSignInButton,
} from './button.styles';

// we turn BUTTON_TYPE_CLASSES to an enum instead of remaining an object as we want every elt to behave as a constant
/* export const BUTTON_TYPE_CLASSES = {
  base: 'base',
  google: 'google-sign-in', // each key here is a type of button
  inverted: 'inverted',
}; */
export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in', // each key here is a type of button
  inverted = 'inverted',
}
//the below function simply returns a map object  that maps button types to their respective styled components
const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => {
  return {
    [BUTTON_TYPE_CLASSES.base]: BaseButton,
    [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
    [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
  }[buttonType];
};
export type ButtonProps = {
  children: ReactNode;
  buttonType?: BUTTON_TYPE_CLASSES; // question Mark always means optional
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({
  children,
  buttonType,
  ...otherProps
}: ButtonProps) => {
  // FC for Functional Component
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
