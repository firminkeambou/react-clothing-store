import { createContext, useReducer } from 'react';
import { createAction } from '../utils/reducer/reducer.utils';
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
/// using a reducer for states
// step1  === define actions needed to update a state
export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_TOTAL_ITEMS: 'SET_CART_TOTAL_ITEMS',
  SET_CART_TOTAL_PRICE: 'SET_CART_TOTAL_PRICE',
};

//step2  === define a reducer function
const cartReducer = (state, action) => {
  console.log('dispatching cart action');
  console.log('Cart reducer action:', action);
  const { type, payload } = action; // Destructure type and payload from the action object
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      //const { cartItems, cartCount, cartTotalPrice } = payload;
      return {
        ...state,
        ...payload,
      };
    /*case CART_ACTION_TYPES.SET_CART_TOTAL_ITEMS:
      return {
        ...state,
        cartCount: payload,
      };*/
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    /*case CART_ACTION_TYPES.SET_CART_TOTAL_PRICE:
      return {
        ...state,
        cartTotalPrice: payload,
      };*/
    default:
      throw new Error(`Unhandled action type: ${type} in userReducer`); // Error handling for unrecognized action types
  }
};
//step3   === define initial state
const CART_INITIAL_STATE = {
  cartItems: [], // default value for cartItems
  isCartOpen: false, // default value for isCartOpen
  cartCount: 0, //total Items in the CART
  cartTotalPrice: 0,
};

//step4 === use hook useReducer(); within the provider component
//const [state, dispatch] = useReducer

//step 5 === for each function that set a state, call dispatch to give instructions
//  const setCurrentUser = (user) => {     dispatch({})}
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
  //const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  //const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const { cartItems, cartCount, isCartOpen, cartTotalPrice } = state; // Destructure cartItems from the state object
  const setCartItems = (newCartItems) => {
    dispatch(
      createAction(
        CART_ACTION_TYPES.SET_CART_ITEMS,
        updateCartItemsReducer(newCartItems)
      )
    );
  };
  /* const setCartCount = (newcount) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_TOTAL_ITEMS,
      payload: newcount,
    });
  };*/
  const setIsCartOpen = (currentStatus) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, !currentStatus));
  };
  /*const setCartTotalPrice = (newTotal) => {
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_TOTAL_PRICE,
      payload: newTotal,
    });
  };*/
  /*useEffect(() => {
    setCartCount(newCartCount(cartItems));
  }, [cartItems]);

  useEffect(() => {
    setCartTotalPrice(totCartPrice(cartItems));
  }, [cartItems]);*/

  const updateCartItemsReducer = (newCartItems) => {
    // Generate new cart total and new cart count
    return {
      cartItems: newCartItems,
      cartCount: newCartCount(newCartItems),
      cartTotalPrice: totCartPrice(newCartItems),
    };
  };

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
