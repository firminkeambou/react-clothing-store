import styled from 'styled-components';

export const CheckoutContainer = styled.div`
  margin: 10px 120px;
`;

export const CheckoutHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 0.5fr 1fr 1fr;
  grid-gap: 15px;
`;

export const HeaderPrice = styled.h4`
  display: flex;
  justify-content: flex-end;
`;
export const HeaderRemove = styled.h4`
  display: flex;
  justify-content: flex-end;
`;

export const CheckoutFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 15px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: large;
  font-weight: bold;
`;

//ffff
/*
.checkout-container {
  margin: 10px 120px;
  .checkout-header {
    display: grid;
    //grid-template-columns: auto auto auto auto auto;
    grid-template-columns: 1fr 2fr 0.5fr 1fr 1fr;
    grid-gap: 15px;
  }
  .header-price {
    display: flex;
    justify-content: flex-end;
  }
  .header-remove {
    display: flex;
    justify-content: flex-end;
  }
  .checkout-footer {
    display: flex;
    flex-direction: row-reverse;
    margin-right: 15px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: large;
    font-weight: bold;
  }
}
*/
