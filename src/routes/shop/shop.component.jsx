import React from 'react';
//import { CategoriesContext } from '../../contexts/categories.context';
//import SHOP_DATA from '../../db/shop-data.json'; // Importing the shop data from a JSON file
//import ProductCard from '../../components/product-card/product-card.component';
//import CategoryPreview from '../../components/category-preview/category-preview.component';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
const Shop = () => {
  //const { categoriesMap } = useContext(CategoriesContext);
  //console.log(products); // Logging the shop data to the console for debugging purposes
  // bear in mind that each route here will be relative to the shop route, as shop route is going to be the parent route
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
