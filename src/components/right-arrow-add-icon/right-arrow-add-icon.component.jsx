import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow-svgrepo-com.svg';
import './right-arrow-add-icon.styles.scss'; // styles for the cart icon component
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
const RightArrowAddIcon = ({ itemId }) => {
  const { addItemCartQuantity } = useContext(CartContext);
  //adding item quantity

  const addQuantityItem = () => addItemCartQuantity(itemId); //setCurrentQuantity((prev) => prev + 1);

  return (
    <div className="right-arrow-icon-container" onClick={addQuantityItem}>
      <RightArrowIcon className="right-arrow-icon" />
    </div>
  );
};

export default RightArrowAddIcon;
