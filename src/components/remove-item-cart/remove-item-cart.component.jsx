import {
  RemoveItemContainer,
  RemoveItemIcon,
} from './remove-item-cart.styles.jsx'; // styles for the cart icon component
//import { useContext } from 'react'; // Importing useContext to access context values
//import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
import { removeItemFromCart } from '../../redux/store/cart/cart.action.js'; // Importing the ToggleContext to
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/store/cart/cart.selector.js';
const RemoveItemCart = ({ itemId }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const removeFromCartItem = () =>
    dispatch(removeItemFromCart(cartItems, itemId));
  //const { removeItemFromCart } = useContext(CartContext);
  return (
    <RemoveItemContainer onClick={removeFromCartItem}>
      <RemoveItemIcon />
    </RemoveItemContainer>
  );
};

export default RemoveItemCart;
