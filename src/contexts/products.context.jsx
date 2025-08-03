import { createContext, useEffect, useState } from 'react';

import PRODUCTS from '../db/shop-data.json'; // Importing the shop data from a JSON file

export const ProductsContext = createContext({
  products: [], // default value for products
  setProducts: () => null, // default function to set products
});

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from an API or database
    const fetchProducts = () => {
      //const response = await fetch('/api/products');
      //const data = await response.json();
      setProducts(PRODUCTS);
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
