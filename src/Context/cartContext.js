import React from "react";
import { createCartStore } from "Store/cartStore";
import { useLocalStore } from "mobx-react";

const CartContext = React.createContext(null);

export const CartProvider = ({ children, value }) => {
  const cartStore = useLocalStore(() => createCartStore(value));
  return (
    <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
  );
};

export const useCartStore = () => React.useContext(CartContext);
