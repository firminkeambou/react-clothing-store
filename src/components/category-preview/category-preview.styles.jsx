import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
export const CategoryTitle = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;
/*
.category-preview-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  .category-title {
    font-size: 28px;
    margin-bottom: 25px;
    cursor: pointer;
  }
  .preview {
    display: grid;
    grid-template-columns: repeat(
      4,
      1fr
    ); // this stays in the same line whatever
    //grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); this will make the items responsive and move to the next line if there is a need for space
    column-gap: 20px;
  }
}
*/
