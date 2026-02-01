import React, { FC, InputHTMLAttributes } from 'react';
import { Group, Input, FormInputLabel } from './form-input.styles'; // imports the styles for the form input component

type FormInputProps = { label: string } & InputHTMLAttributes<HTMLInputElement>; // the extension is for "otherProps"

const FormInput: FC<FormInputProps> = ({
  label,
  ...otherProps
}: FormInputProps) => {
  // simple { label, ...otherProps } can work as well
  return (
    <Group>
      {
        // if label is provided, it will render the label element with the className 'form-input-label',
        label && (
          <FormInputLabel
            shrink={Boolean(
              otherProps.value &&
                typeof otherProps.value === 'string' &&
                otherProps.value.length
            )} // if there is a value in the input, it will shrink the label
          >
            {label}
          </FormInputLabel>
        )
      }
      <Input
        {...otherProps}
        // spread operator to pass all other props to the input element, such as type, name, value, onChange, etc.
      />
    </Group>
  );
};

export default FormInput;

/* old code
{
        // if label is provided, it will render the label element with the className 'form-input-label',
        label && (
          <label
            className={`${
              otherProps.value.length ? 'shrink' : ''
            } form-input-label`}
          >
            {label}
          </label>
        )
      }
      <input
        className="form-input"
        {...otherProps}
        // spread operator to pass all other props to the input element, such as type, name, value, onChange, etc.
      />
*/
