import { createContext, useEffect, useState } from 'react';
import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';

//import PRODUCTS from '../db/shop-data'; // Importing the shop data from a JSON file,actually no variable is needed in the original file
//import SHOP_DATA from '../db/shop-data.js'; // Importing the shop data from a JSON file
export const CategoriesContext = createContext({
  categoriesMap: {}, // default value for categories
  setCategoriesMap: () => null, // default function to set categories
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    //this is a recommended pattern when fetching data using async/await; Additional helper function is a requirement especially for async/await
    const fetchCategories = async () => {
      const categoriesMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesMap);
      //console.log(categoriesMap);
    };
    fetchCategories();
  }, []);

  // the below code(useEffect) is commented out because we are using Firestore to store data for the very first time

  /*useEffect(() => {
    // Fetch products from an API or database
    //const fetchProducts = () => {
    //const response = await fetch('/api/products');
    //const data = await response.json();
    //setProducts(PRODUCTS);
    addCollectionAndDocuments('categories', SHOP_DATA);
    //};

    //fetchProducts();
  }, []);*/

  return (
    <CategoriesContext.Provider value={{ categoriesMap, setCategoriesMap }}>
      {children}
    </CategoriesContext.Provider>
  );
};
