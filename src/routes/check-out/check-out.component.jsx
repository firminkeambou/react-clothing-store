import { useContext } from 'react';
import CheckOutItem from '../../components/check-out-item/check-out-item.component';
import { CartContext } from '../../contexts/cart.context';
import './check-out.styles.jsx';
import {
  HeaderPrice,
  HeaderRemove,
  CheckoutContainer,
  CheckoutFooter,
  CheckoutHeader,
} from './check-out.styles.jsx';
const CheckOut = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);
  //console.log(cartItems[0]);
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <div className="product">
          <h4>Product</h4>
        </div>
        <h4>Description</h4>
        <h4>Quantity</h4>
        <HeaderPrice>Unit Price</HeaderPrice>
        <HeaderRemove>Remove</HeaderRemove>
      </CheckoutHeader>
      <hr />
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <>
            <CheckOutItem key={item.id} cartItem={item} />
            <hr />
          </>
        ))
      ) : (
        <h3 style={{ color: 'red' }}> The Card is empty</h3>
      )}

      <br />
      <CheckoutFooter>
        {cartItems.length > 0 && <span>TOTAL: ${cartTotalPrice}</span>}
      </CheckoutFooter>
    </CheckoutContainer>
  );
};

export default CheckOut;
