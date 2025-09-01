import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';
const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link className="category-title" to={title.toLowerCase()}>
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">
        {
          products
            .filter((_, index) => index < 4)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            )) // "_" means we are not using the first argument (the product) in the filter function, on the other hands , we are displaying the first four products
        }
      </div>
    </div>
  );
};

export default CategoryPreview;
