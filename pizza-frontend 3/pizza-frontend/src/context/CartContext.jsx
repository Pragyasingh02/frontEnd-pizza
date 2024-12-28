import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => { 
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (pizza, quantity) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[pizza.id]) {
        newCart[pizza.id].quantity += quantity;
      } else {
        newCart[pizza.id] = { ...pizza, quantity };
      }
      return newCart;
    });
  };

  const getCartItems = () => Object.values(cart);

  const removeFromCart = (id) => {
    setCart((prevCart) => {
      const { [id]: _, ...newCart } = prevCart;
      return newCart;
    });
  };

  const incrementQuantity = (id) => {
    setCart((prevCart) => {
      const item = prevCart[id];
      if (item) {
        return {
          ...prevCart,
          [id]: {
            ...item,
            quantity: item.quantity + 1,
          },
        };
      }
      return prevCart;
    });
  };

  const decrementQuantity = (id) => {
    setCart((prevCart) => {
      const item = prevCart[id];
      if (item) {
        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
          const { [id]: _, ...newCart } = prevCart;
          return newCart;
        }
        return {
          ...prevCart,
          [id]: {
            ...item,
            quantity: newQuantity,
          },
        };
      }
      return prevCart;
    });
  };

  const removeAllCartItems = () => {
    setCart({});
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getCartItems,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        removeAllCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
