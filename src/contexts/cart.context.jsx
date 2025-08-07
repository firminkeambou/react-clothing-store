import { createContext, useState, useEffect } from 'react';

const newCartCount = (cartitems) =>
  cartitems.reduce((total, item) => total + item.quantity, 0);

const addCartItem = (cartItems, productToAdd) => {
  // Check if the item already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );
  // If the item exists, update its quantity
  // If it doesn't exist, add it to the cart with a quantity of 1
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};
export const CartContext = createContext({
  isCartOpen: false, // default value for isCartOpen
  setIsCartOpen: () => null, // default function to set isCartOpen
  cartItems: [], // default value for cartItems
  addItemToCart: () => {}, // default function to set cartItems
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(newCartCount(cartItems));
  }, [cartItems]);

  // we stopped calling setCartCount inside the below function because of the synchronous aspect of setCartCount, so it's better to use "useEffect" or even expose a function
  const addItemToCart = (productToAdd) => {
    // Logic to add item to cart
    setCartItems(addCartItem(cartItems, productToAdd));
    //setCartCount(sumItemsCount(cartItems));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
