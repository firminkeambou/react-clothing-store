import React, { useEffect } from 'react';
//import { CategoriesContext } from '../../contexts/categories.context';
//import SHOP_DATA from '../../db/shop-data.json'; // Importing the shop data from a JSON file
//import ProductCard from '../../components/product-card/product-card.component';
//import CategoryPreview from '../../components/category-preview/category-preview.component';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
//import { setCategories } from '../../redux/store/categories/category.action';
//import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesAsync } from '../../redux/store/categories/category.action';
import { useDispatch } from 'react-redux';
import Category from '../category/category.component';
const Shop = () => {
  const dispatch = useDispatch();
  //const { categoriesMap } = useContext(CategoriesContext);
  //console.log(products); // Logging the shop data to the console for debugging purposes
  // bear in mind that each route here will be relative to the shop route, as shop route is going to be the parent route
  // the below code is the useEffect for categories
  useEffect(() => {
    //this is a recommended pattern when fetching data using async/await; Additional helper function is a requirement especially for async/await
    const fetchCategories = () => {
      //const categoriesArray = await getCategoriesAndDocuments(); no more needed as we are using redux-thunk
      //dispatch(setCategories(categoriesArray)); no more needed as we are using redux-thunk
      //console.log(categoriesArray);
      dispatch(fetchCategoriesAsync());
      //console.log(categoriesMap);
    };
    fetchCategories();
  }, [dispatch]);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
