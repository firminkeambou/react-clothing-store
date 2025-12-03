//import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow-svgrepo-com.svg';
import {
  AddItemCartContainer,
  IncreaseArrow,
} from './add-item-cart.styles.jsx'; // styles for the cart icon component
//import { useContext } from 'react'; // Importing useContext to access context values
//import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
import { addItemCartQuantity } from '../../redux/store/cart/cart.action.js'; // Importing the ToggleContext to
import { selectCartItems } from '../../redux/store/cart/cart.selector.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const AddItemCart = ({ itemId }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  //const { addItemCartQuantity } = useContext(CartContext);
  //adding item quantity

  const addQuantityItem = () =>
    dispatch(addItemCartQuantity(cartItems, itemId)); //setCurrentQuantity((prev) => prev + 1);

  return (
    <AddItemCartContainer onClick={addQuantityItem}>
      <IncreaseArrow />
    </AddItemCartContainer>
  );
};

export default AddItemCart;
