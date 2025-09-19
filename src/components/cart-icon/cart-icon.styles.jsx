import styled from 'styled-components';
import { ReactComponent as ShoppingIconSVG } from '../../assets/shopping-bag.svg';
export const ShoppingIcon = styled(ShoppingIconSVG)`
  width: 24px;
  height: 24px;
`;
export const ItemCount = styled.span`
  position: absolute; // position relative to the nearest positioned ancestor, which is the cart-icon-container
  font-size: 10px;
  font-weight: bold;
  bottom: 12px; // position the item count 12px from the bottom of the cart icon container
`;
export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
/*
.cart-icon-container {
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  .shopping-icon {
    width: 24px;
    height: 24px;
  }
  .item-count {
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
  }
}
*/
