import React from 'react'
import './form-input.styles.scss'; // imports the styles for the form input component
const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
        { // if label is provided, it will render the label element with the className 'form-input-label',
         label && (
          <label 
           className={`${otherProps.value.length ? 'shrink' : ''} form-input-label`}>
            {label}
          </label>
        )}
          <input 
            className='form-input' 
           {...otherProps}
            // spread operator to pass all other props to the input element, such as type, name, value, onChange, etc.
          />
    </div>
  )
}
        
export default FormInput