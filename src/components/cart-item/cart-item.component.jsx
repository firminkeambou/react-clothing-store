import React from 'react';
import {
  CartItemContainer,
  ItemDetails,
  Name,
  Image,
} from './cart-item.styles.jsx';
const CartItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem; // Destructuring the name property from cartItem
  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <Name>{name}</Name>
        <span className="price">
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
