//import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow-svgrepo-com.svg';
import {
  AddItemCartContainer,
  IncreaseArrow,
} from './add-item-cart.styles.jsx'; // styles for the cart icon component
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
const AddItemCart = ({ itemId }) => {
  const { addItemCartQuantity } = useContext(CartContext);
  //adding item quantity

  const addQuantityItem = () => addItemCartQuantity(itemId); //setCurrentQuantity((prev) => prev + 1);

  return (
    <AddItemCartContainer onClick={addQuantityItem}>
      <IncreaseArrow />
    </AddItemCartContainer>
  );
};

export default AddItemCart;
