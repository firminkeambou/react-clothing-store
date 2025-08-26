import React, { useContext } from 'react';
import { ProductsContext } from '../../contexts/products.context';
//import SHOP_DATA from '../../db/shop-data.json'; // Importing the shop data from a JSON file
import ProductCard from '../../components/product-card/product-card.component';
import './shop.styles.scss';
const Shop = () => {
  const { products } = useContext(ProductsContext);
  //console.log(products); // Logging the shop data to the console for debugging purposes
  return (
    <div className="products-container">
      {/** Here you can map through products to display the items in the shop */}
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Shop;
