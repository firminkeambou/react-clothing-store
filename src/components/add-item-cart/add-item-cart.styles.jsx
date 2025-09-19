import styled from 'styled-components';
import { ReactComponent as RightArrowIcon } from '../../assets/right-arrow-svgrepo-com.svg';
export const AddItemCartContainer = styled.div`
  width: 30px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;
export const IncreaseArrow = styled(RightArrowIcon)`
  width: 15px;
  height: 15px;
`;
/*
.right-arrow-icon-container {
  width: 30px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 10px;
  //justify-content: space-between;
  //gap: 3px;
  cursor: pointer;
  .right-arrow-icon {
    width: 15px;
    height: 15px;
  }
}*/
