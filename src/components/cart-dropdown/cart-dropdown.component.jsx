import './cart-dropdown.styles.scss';
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to manage toggle state
import Button from '../button/button.component'; // Importing the Button component to use in the cart dropdown
const CartDropdown = () => {
  const { setIsCartOpen } = useContext(CartContext);

  const handleCheckout = () => {
    // Logic for handling checkout can be added here
    console.log('Proceeding to checkout');
    setIsCartOpen(false); // Close the dropdown after checkout
  };
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
