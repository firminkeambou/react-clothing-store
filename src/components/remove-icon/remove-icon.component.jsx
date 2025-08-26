import { ReactComponent as RemoveIcon } from '../../assets/close-cross-svgrepo-com.svg';
import './remove-icon.styles.scss'; // styles for the cart icon component
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
const RemoveItemIcon = ({ itemId }) => {
  const { removeItemFromCart } = useContext(CartContext);
  const removeFromCartItem = () => removeItemFromCart(itemId);

  return (
    <div className="remove-icon-container" onClick={removeFromCartItem}>
      <RemoveIcon className="remove-icon" />
    </div>
  );
};

export default RemoveItemIcon;
