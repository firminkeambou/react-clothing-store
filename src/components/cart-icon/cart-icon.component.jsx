import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import './cart-icon.styles.scss'; // styles for the cart icon component
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
const CartIcon = () => {
  const { setIsCartOpen, cartCount } = useContext(CartContext);

  const toggleCartDropdown = () => {
    cartCount == 0
      ? alert(`empty Card, Can't be opened`)
      : setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="cart-icon-container" onClick={toggleCartDropdown}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
