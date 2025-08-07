import React from 'react';
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the CartContext to manage
import Button from '../button/button.component';
import './product-card.styles.scss';
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product; // Destructuring product properties
  const { addItemToCart } = useContext(CartContext);
  // Using the addItemToCart function from CartContext to add the product to the cart
  // This function will be defined in the CartContext to handle adding items to the cart
  // writing the function to handle adding the product to the cart this way become more readable and maintainable(optimization)
  const handleAddItemToCart = () => {
    addItemToCart(product);
  };
  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={handleAddItemToCart}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
