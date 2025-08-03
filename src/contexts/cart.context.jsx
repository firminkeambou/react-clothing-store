import { createContext, useState } from 'react';

export const CartContext = createContext({
  isCartOpen: false, // default value for isCartOpen
  setCartOpen: () => null, // default function to set isCartOpen
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen }; // Providing the state and function to update it
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
