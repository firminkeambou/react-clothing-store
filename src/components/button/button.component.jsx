import React from 'react'
import './button.styles.scss'
//object definining possible classes for a button

const BUTTON_TYPE_CLASSES = {
    google:'google-sign-in',  // each key here is a type of button
    inverted : 'inverted',
    success:'success'
}

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
        {children}
    </button>
  )
}

export default Button