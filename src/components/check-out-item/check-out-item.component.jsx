import React from 'react';
import RightArrowAddIcon from '../right-arrow-add-icon/right-arrow-add-icon.component';
import LeftArrowDecreaseIcon from '../left-arrow-decrease-icon/left-arrow-decrease-icon.component';
import RemoveItemIcon from '../remove-icon/remove-icon.component';
import './check-out-item.styles.scss';
const CheckOutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  //console.log(item);
  return (
    <div className="check-out-item-container">
      <div className="cart-image">
        <img src={imageUrl} alt={name} />
      </div>

      <h5>{name}</h5>
      <div className="checkout-quantity">
        {/* alternative left arrow <span>&#10094;</span> */}
        <LeftArrowDecreaseIcon itemId={id} />
        <h5>{quantity}</h5>
        <RightArrowAddIcon itemId={id} />
        {/* alternative right arrow <span>&#10095;</span> */}
      </div>
      <h5 className="item-price">${price}</h5>
      <div className="item-remove">
        <RemoveItemIcon itemId={id} />
        {/*
        an alternative to have a remove icon which is a svg image
        <span>&#10005;</span>*/}
      </div>
    </div>
  );
};

export default CheckOutItem;
