import React from 'react';
import { useContext } from 'react'; // Importing useContext to access context values
import { CartContext } from '../../contexts/cart.context'; // Importing the CartContext to manage
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import {
  ProductCardContainer,
  Image,
  Name,
  Price,
  Footer,
} from './product-card.styles.jsx';
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
    <ProductCardContainer>
      <Image src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>${price}</Price>
      </Footer>
      <Button
        type="button"
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={handleAddItemToCart}
      >
        Add to Cart
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
