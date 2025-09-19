import React from 'react';
//import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import {
  CategoryPreviewContainer,
  CategoryTitle,
  Preview,
} from './category-preview.styles.jsx';
const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title.toLowerCase()}>
          {title.toUpperCase()}
        </CategoryTitle>
      </h2>
      <Preview>
        {
          products
            .filter((_, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            )) // "_" means we are not using the first argument (the product) in the filter function, on the other hands , we are displaying the first four products
        }
      </Preview>
    </CategoryPreviewContainer>
  );
};

export default CategoryPreview;
