import { createContext, useContext, useReducer } from "react";
import products from "../data/products";
import cartReducer from "../reducer/cartReducer";

const CartContext = createContext();
const initState = {
  products: products,
  total: 0,
  amount: 0,
};

export const CartProvider = ({ children }) => {
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(cartReducer, initState);
  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  );
};

// การนำเอา context ไปใช้งานด้านนอก
export const useCart = () => {
  return useContext(CartContext);
};
