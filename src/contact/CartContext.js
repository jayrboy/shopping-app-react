import { createContext, useContext } from "react";
import products from "../data/products";

const CartContext = createContext();
const initState = {
  products: products,
  total: 0,
  amount: 0,
};

// การนำเอา context ไปใช้งานด้านนอก
export const useCart = () => {
  return useContext(useCart);
};
