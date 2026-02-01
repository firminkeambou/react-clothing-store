import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from '../../assets/left-arrow-svgrepo-com.svg';
export const DecreaseItemCartContainer = styled.div`
  width: 15px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;
export const DecreaseArrow = styled(LeftArrowIcon)`
  width: 15px;
  height: 15px;
`;
/*


/*.left-arrow-icon-container {
  width: 15px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 10px;

  //justify-content: space-between;
  //gap: 3px;
  cursor: pointer;
  .left-arrow-icon {
    width: 15px;
    height: 15px;
  }
}
*/
