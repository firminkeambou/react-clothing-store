import styled from 'styled-components';

export const CheckOutItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.5fr 1fr 1fr;
  grid-gap: 15px;
`;
export const CheckoutQuantity = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
export const CartImage = styled.div`
  width: 60px;
`;
export const ItemPrice = styled.h5`
  display: flex;
  justify-content: flex-end;
`;
export const ItemRemove = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const Image = styled.img`
  width: 100%;
  border-radius: 10px;
`;
/* Original SCSS styles below
.check-out-item-container {
  //display: flex;
  //flex-direction: row;
  //justify-content: space-between;
  //align-items: center;

  display: grid;
  //grid-template-columns: auto auto auto auto auto;
  grid-template-columns: 1fr 2fr 0.5fr 1fr 1fr;
  grid-gap: 15px;
  .checkout-quantity {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    //margin-left: 20px;
  }
  .cart-image {
    width: 60px;
  }
  .item-price {
    display: flex;
    justify-content: flex-end;
  }
  .item-remove {
    display: flex;
    justify-content: flex-end;
  }
}
img {
  width: 100%;
  border-radius: 10px;
}
*/
