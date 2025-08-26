import { createContext, useState, useEffect } from 'react';

const newCartCount = (cartitems) =>
  cartitems.reduce((total, item) => total + item.quantity, 0);
// total cost of the cart
const totCartPrice = (cartitems) =>
  cartitems.reduce(
    (total, item) => total + Number(item.quantity) * Number(item.price),
    0
  );
///------------------------------
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

const addCartItemQuantity = (cartItems, productId) => {
  // Check if the item already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productId
  );
  // If the item exists, update its quantity
  // If it doesn't exist, add it to the cart with a quantity of 1
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productId
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
          }
        : cartItem
    );
  }
};

const decreaseCartItemQuantity = (cartItems, productId) => {
  // Check if the item already exists in the cart
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productId
  );

  // If the item exists and is removable(quantity==1), remove it from the cart

  if (existingCartItem.quantity === 1) {
    //window.confirm('Are you sure you want to remove this item?');
    return cartItems.filter((cartItem) => cartItem.id !== productId);
  }

  // If the item exists, update its quantity
  // If it doesn't exist, add it to the cart with a quantity of 1
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productId && cartItem.quantity > 0
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
  }
};
// a helper function to remove an item from the cart
const removeItem = (cartItems, itemId) => {
  const filteredCartItems = cartItems.filter((item) => item.id !== itemId);
  return filteredCartItems;
};

export const CartContext = createContext({
  isCartOpen: false, // default value for isCartOpen
  setIsCartOpen: () => null, // default function to set isCartOpen
  cartItems: [], // default value for cartItems
  addItemToCart: () => {}, // default function to set cartItems
  addItemCartQuantity: () => {},
  decreaseItemCartQuantity: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  useEffect(() => {
    setCartCount(newCartCount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setCartTotalPrice(totCartPrice(cartItems));
  }, [cartItems]);

  // we stopped calling setCartCount inside the below function because of the synchronous aspect of setCartCount, so it's better to use "useEffect" or even expose a function
  const addItemToCart = (productToAdd) => {
    // Logic to add item to cart
    setCartItems(addCartItem(cartItems, productToAdd));
    //setCartCount(sumItemsCount(cartItems));
  };

  // adding quantity of a single elt
  const addItemCartQuantity = (productId) => {
    setCartItems(addCartItemQuantity(cartItems, productId));
  };

  // adding quantity of a single elt
  const decreaseItemCartQuantity = (productId) => {
    setCartItems(decreaseCartItemQuantity(cartItems, productId));
  };
  // remove item from Card
  const removeItemFromCart = (productId) => {
    setCartItems(removeItem(cartItems, productId));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    addItemCartQuantity,
    decreaseItemCartQuantity,
    removeItemFromCart,
    cartCount,
    cartTotalPrice,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
