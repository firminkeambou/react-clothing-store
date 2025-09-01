import React from 'react';
import './directory.styles.scss';
import DirectoryItem from '../directory-item/directory-item.component.jsx';

const Directory = ({ categories }) => {
  // The Directory component maps over the categories array and renders a CategoryItem for each category
  return (
    <div className="directory-container">
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Directory;
