import styled from 'styled-components';
import { ReactComponent as RemoveIcon } from '../../assets/close-cross-svgrepo-com.svg';
export const RemoveItemContainer = styled.div`
  width: 40px;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 30px;
  //gap: 3px;
  cursor: pointer;
`;
export const RemoveItemIcon = styled(RemoveIcon)`
  width: 15px;
  height: 15px;
`;
