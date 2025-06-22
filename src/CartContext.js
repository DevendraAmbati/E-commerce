// CartContext.js
import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const isItemInCart = (itemId) => {
    return cartItems.some((item) => item.id === itemId);
  };

  const addToCart = (item) => {
    // Check if the item is already in the cart
    if (!isItemInCart(item.id)) {
      setCartItems((prevItems) => [...prevItems, item]);
    } else {
      // Show toast message for duplicate item
      toast.error('Item is already in the cart', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const incrementItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, stock: item.stock + 1 } : item
      )
    );
  };

  const decrementItem = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          const newStock = Math.max(item.stock - 1, 0);
          // Remove the item if the stock becomes 0
          return newStock === 0 ? null : { ...item, stock: newStock };
        } else {
          return item;
        }
      }).filter(Boolean) // Remove null values
    );
  };  

  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, incrementItem, decrementItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
