import { createContext, useContext } from "react";

// create context
const CartContext = createContext();

// การนำเอา context ไปใช้งานด้านนอก
export const useCart = () => {
  return useContext(useCart);
};
