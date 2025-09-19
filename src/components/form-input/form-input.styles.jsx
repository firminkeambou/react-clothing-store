import styled, { css } from 'styled-components';

const subColor = 'grey'; // variable
const mainColor = 'black';

const shrinkLabelStyles = css`
  top: -14px;
  font-size: 12px;
  color: ${mainColor};
`;
export const FormInputLabel = styled.label`
  color: ${subColor};
  font-size: 16px;
  font-weight: normal;
  position: absolute;
  pointer-events: none;
  left: 5px;
  top: 10px;
  transition: 300ms ease all;
  ${({ shrink }) => shrink && shrinkLabelStyles};
`;

export const Input = styled.input`
  background: none;
  background-color: white;
  color: ${subColor};
  font-size: 18px;
  padding: 8px 10px 10px 5px;
  display: block;
  width: 100%;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid ${subColor};
  margin: 25px 0;
  &:focus {
    outline: none;
  }
  &:focus ~ ${FormInputLabel} {
    ${shrinkLabelStyles};
  }
`;
export const Group = styled.div`
  position: relative;
  margin: 45px 0;
  input[type='password'] {
    letter-spacing: 0.3em;
  }
`;

// focus ~ .form-input-label  === immediate subsequent sibling selector in CSS
//below is old SASS code  we are converting to styled components
//mixin and @includes are like functions in SASS
//mixin is like a function definition
//Mixins allow you to define styles that can be re-used throughout your stylesheet without repeating the code
//@include is like a function call
//The @ mixin directive lets you create CSS code that is to be reused throughout the website. The @include directive is created to let you use (include) the mixin
/*
$sub-color: grey;  // variable
$main-color: black; // variable in SASS

@mixin shrinkLabel {
  top: -14px;
  font-size: 12px;
  color: $main-color;
}

.group {
  position: relative;
  margin: 45px 0;
  .form-input {
    background: none;
    background-color: white;
    color: $sub-color;
    font-size: 18px;
    padding: 8px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid $sub-color;
    margin: 25px 0;
    &:focus {
      outline: none;
    }
    &:focus ~ .form-input-label {
      @include shrinkLabel();
    }
  }

  input[type='password'] {
    letter-spacing: 0.3em;
  }

  .form-input-label {
    color: $sub-color;
    font-size: 16px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    top: 10px;
    transition: 300ms ease all;

    &.shrink {
      @include shrinkLabel();
    }
  }
}

*/
