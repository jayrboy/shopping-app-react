import Item from "./Item";
import { useCart } from "../contact/CartContext";

export default function Cart() {
  const { products } = useCart();

  return (
    <div className="cart">
      {products.map((data) => {
        return <Item key={data.id} {...data} />;
      })}
    </div>
  );
}
