import React from 'react';
import AddItemCart from '../add-item-cart/add-item-cart.component';
import DecreaseItemCart from '../decrease-item-cart/decrease-item-cart.component';
import RemoveItemCart from '../remove-item-cart/remove-item-cart.component';
import {
  CheckOutItemContainer,
  Image,
  ItemPrice,
  ItemRemove,
  CartImage,
  CheckoutQuantity,
} from './check-out-item.styles.jsx';
const CheckOutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  //console.log(item);
  return (
    <CheckOutItemContainer>
      <CartImage>
        <Image src={imageUrl} alt={name} />
      </CartImage>

      <h5>{name}</h5>
      <CheckoutQuantity>
        {/* alternative left arrow <span>&#10094;</span> */}
        <DecreaseItemCart itemId={id} />
        <h5>{quantity}</h5>
        <AddItemCart itemId={id} />
        {/* alternative right arrow <span>&#10095;</span> */}
      </CheckoutQuantity>

      <ItemPrice>${price}</ItemPrice>
      <ItemRemove>
        <RemoveItemCart itemId={id} />
        {/*
        an alternative to have a remove icon which is a svg image
        <span>&#10005;</span>*/}
      </ItemRemove>
    </CheckOutItemContainer>
  );
};

export default CheckOutItem;
