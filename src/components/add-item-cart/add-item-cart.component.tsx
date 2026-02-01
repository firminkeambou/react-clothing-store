//import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow-svgrepo-com.svg';
import { AddItemCartContainer, IncreaseArrow } from './add-item-cart.styles'; // styles for the cart icon component
//import { useContext } from 'react'; // Importing useContext to access context values
//import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
import { addItemCartQuantity } from '../../redux/store/cart/cart.action'; // Importing the ToggleContext to
import { selectCartItems } from '../../redux/store/cart/cart.selector';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ItemIdProps } from '../../utils/components-general-types/components.general.types.js';

const AddItemCart = ({ itemId }: ItemIdProps) => {
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
