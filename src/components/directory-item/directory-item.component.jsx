import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles.jsx';
// This component displays a single category item with an image and title
const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  const navigate = useNavigate();
  const onNavigateHandler = () => navigate(`/shop/${title.toLowerCase()}`);
  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>

        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

/* old code before styled-components concerning BackgroundImage

<div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />

      <Link to={`/shop/${title.toLowerCase()}`}>
          <p>Shop Now</p>
        </Link>
      */
