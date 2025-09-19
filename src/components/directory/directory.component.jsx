import React from 'react';
import { DirectoryContainer } from './directory.styles.jsx';
import DirectoryItem from '../directory-item/directory-item.component.jsx';

const Directory = ({ categories }) => {
  // The Directory component maps over the categories array and renders a CategoryItem for each category
  return (
    <DirectoryContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
