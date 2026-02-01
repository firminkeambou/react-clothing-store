//import { ReactComponent as LeftArrowIcon } from '../../assets/left-arrow-svgrepo-com.svg';
//import './decrease-item-cart.styles.jsx'; // styles for the cart icon component
//import { useContext } from 'react'; // Importing useContext to access context values
//import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
import {
  DecreaseArrow,
  DecreaseItemCartContainer,
} from './decrease-item-cart.styles';
import { decreaseItemCartQuantity } from '../../redux/store/cart/cart.action'; // Importing the ToggleContext to
import { selectCartItems } from '../../redux/store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ItemIdProps } from '../../utils/components-general-types/components.general.types';

const DecreaseItemCart = ({ itemId }: ItemIdProps) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  //const { decreaseItemCartQuantity } = useContext(CartContext);

  const decreaseQuantityItem = () =>
    dispatch(decreaseItemCartQuantity(cartItems, itemId));

  return (
    <DecreaseItemCartContainer onClick={decreaseQuantityItem}>
      <DecreaseArrow />
    </DecreaseItemCartContainer>
  );
};

export default DecreaseItemCart;
