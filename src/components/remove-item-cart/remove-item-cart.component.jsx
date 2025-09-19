import {
  RemoveItemContainer,
  RemoveItemIcon,
} from './remove-item-cart.styles.jsx'; // styles for the cart icon component
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
const RemoveItemCart = ({ itemId }) => {
  const { removeItemFromCart } = useContext(CartContext);
  const removeFromCartItem = () => removeItemFromCart(itemId);

  return (
    <RemoveItemContainer onClick={removeFromCartItem}>
      <RemoveItemIcon />
    </RemoveItemContainer>
  );
};

export default RemoveItemCart;
