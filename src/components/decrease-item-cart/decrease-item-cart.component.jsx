//import { ReactComponent as LeftArrowIcon } from '../../assets/left-arrow-svgrepo-com.svg';
import './decrease-item-cart.styles.jsx'; // styles for the cart icon component
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
import {
  DecreaseArrow,
  DecreaseItemCartContainer,
} from './decrease-item-cart.styles.jsx';
const DecreaseItemCart = ({ itemId }) => {
  const { decreaseItemCartQuantity } = useContext(CartContext);

  const decreaseQuantityItem = () => decreaseItemCartQuantity(itemId);

  return (
    <DecreaseItemCartContainer onClick={decreaseQuantityItem}>
      <DecreaseArrow />
    </DecreaseItemCartContainer>
  );
};

export default DecreaseItemCart;
