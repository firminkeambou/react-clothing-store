//import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from './cart-icon.styles.jsx'; // styles for the cart icon component
//import { useContext } from 'react'; // Importing useContext to access context values
//import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
import {
  selectCartCount,
  selectIsCartOpen,
} from '../../redux/store/cart/cart.selector.js';
import { setIsCartOpen } from '../../redux/store/cart/cart.action.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CartIcon = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  //const { setIsCartOpen, cartCount, isCartOpen } = useContext(CartContext);
  const toggleCartDropdown = () => {
    cartCount === 0
      ? alert(`empty Card, Can't be opened`)
      : dispatch(setIsCartOpen(isCartOpen));
  };
  //setIsCartOpen((prev) => !prev);
  return (
    <CartIconContainer onClick={toggleCartDropdown}>
      <ShoppingIcon />
      <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
