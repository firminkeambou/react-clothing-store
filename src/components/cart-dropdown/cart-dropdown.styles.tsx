import styled from 'styled-components';
import {
  BaseButton,
  GoogleSignInButton,
  InvertedButton,
} from '../button/button.styles';
//buttons are targeted in the cart-dropdown-container styles as nested elements
//nesting works only for components imported in the same file
export const CartDropdownContainer = styled.div`
  position: absolute; //position an element at the top of its nearest positioned ancestor. overlapping is authorized, setting up css paramters will cause the component to overlap other elements
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px; // offset from the right side of the viewport
  z-index: 5; // ensures the dropdown is above other elements

  ${BaseButton},
  ${GoogleSignInButton},
  ${InvertedButton} {
    margin-top: auto; // pushes the button to the bottom of the dropdown
  }
`;
export const EmptyMessage = styled.span`
  font-size: 18px;
  margin: 50px auto;
`;
export const CartItems = styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll; //auto/scroll allows scrolling if there are too many items
`;
/* Old SCSS version
.cart-dropdown-container {
  position: absolute; //position an element at the top of its nearest positioned ancestor. overlapping is authorized, setting up css paramters will cause the component to overlap other elements
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px; // offset from the right side of the viewport
  z-index: 5; // ensures the dropdown is above other elements

  .empty-message {
    font-size: 18px;
    margin: 50px auto;
  }
  .cart-items {
    height: 240px;
    display: flex;
    flex-direction: column;
    overflow: scroll; //auto/scroll allows scrolling if there are too many items
  }
  button {
    margin-top: auto; // pushes the button to the bottom of the dropdown
  }
}
*/
