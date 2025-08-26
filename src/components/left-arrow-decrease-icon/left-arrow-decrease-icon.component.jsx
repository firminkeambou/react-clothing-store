import { ReactComponent as LeftArrowIcon } from '../../assets/left-arrow-svgrepo-com.svg';
import './left-arrow-decrease-icon.styles.scss'; // styles for the cart icon component
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the ToggleContext to
const LeftArrowDecreaseIcon = ({ itemId }) => {
  const { decreaseItemCartQuantity } = useContext(CartContext);

  const decreaseQuantityItem = () => decreaseItemCartQuantity(itemId);

  return (
    <div className="left-arrow-icon-container" onClick={decreaseQuantityItem}>
      <LeftArrowIcon className="left-arrow-icon" />
    </div>
  );
};

export default LeftArrowDecreaseIcon;
