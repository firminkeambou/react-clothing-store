import React from 'react';
import { DirectoryContainer } from './directory.styles';
import DirectoryItem from '../directory-item/directory-item.component';
export type CategoryDb = {
  id: number;
  title: string;
  imageUrl: string;
};
type DirectoryProps = {
  categories: CategoryDb[];
};
const Directory = ({ categories }: DirectoryProps) => {
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
