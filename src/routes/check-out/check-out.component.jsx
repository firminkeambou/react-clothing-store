import { useContext } from 'react';
import CheckOutItem from '../../components/check-out-item/check-out-item.component';
import { CartContext } from '../../contexts/cart.context';
import './check-out.styles.scss';
const CheckOut = () => {
  const { cartItems, cartTotalPrice } = useContext(CartContext);
  //console.log(cartItems[0]);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="product">
          <h4>Product</h4>
        </div>
        <h4>Description</h4>
        <h4>Quantity</h4>
        <h4 className="header-price">Unit Price</h4>
        <h4 className="header-remove">Remove</h4>
      </div>
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
      <div className="checkout-footer">
        {cartItems.length > 0 && <span>TOTAL: ${cartTotalPrice}</span>}
      </div>
    </div>
  );
};

export default CheckOut;
