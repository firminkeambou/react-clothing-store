import './cart-dropdown.styles.jsx';
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to manage toggle state
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component'; // Importing the Button component to use in the cart dropdown
import CartItem from '../cart-item/cart-item.component'; // Importing the CartItem component to display items in the cart
import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from './cart-dropdown.styles.jsx'; // Importing styled components for styling
const CartDropdown = () => {
  const navigate = useNavigate();
  const { setIsCartOpen, cartItems, isCartOpen } = useContext(CartContext);
  const goToCheckOutHandler = () => {
    if (cartItems.length <= 0) {
      return alert('Sorry!!! the cart is empty at the moment');
    }
    navigate('/checkout'); // Replace '/target-page' with your desired path
    setIsCartOpen(isCartOpen); // Close the dropdown after checkout
  };
  /*
  const handleCheckout = () => {
    // Logic for handling checkout can be added here
    console.log('Proceeding to checkout');
    setIsCartOpen(false); // Close the dropdown after checkout
  }; */

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length > 0 ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItems>
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
