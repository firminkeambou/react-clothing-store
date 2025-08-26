import './cart-dropdown.styles.scss';
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to manage toggle state
import { useNavigate } from 'react-router-dom';
import Button from '../button/button.component'; // Importing the Button component to use in the cart dropdown
import CartItem from '../cart-item/cart-item.component'; // Importing the CartItem component to display items in the cart
const CartDropdown = () => {
  const navigate = useNavigate();
  const { setIsCartOpen, cartItems } = useContext(CartContext);
  const goToCheckOutHandler = () => {
    if (cartItems.length <= 0) {
      return alert('Sorry!!! the cart is empty at the moment');
    }
    navigate('/checkout'); // Replace '/target-page' with your desired path
    setIsCartOpen(false); // Close the dropdown after checkout
  };
  /*
  const handleCheckout = () => {
    // Logic for handling checkout can be added here
    console.log('Proceeding to checkout');
    setIsCartOpen(false); // Close the dropdown after checkout
  }; */

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item) => (
          <CartItem key={item.id} cartItem={item} />
        ))}
      </div>
      {/** <Button onClick={handleCheckout}>GO TO CHECKOUT</Button>*/}
      <Button onClick={goToCheckOutHandler}>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;
