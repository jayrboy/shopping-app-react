import Item from "./Item";
import { useCart } from "../contact/CartContext";

export default function Cart() {
  const { products, total, formatMoney } = useCart();

  return (
    <div className="cart">
      <h1 style={{ textAlign: "center" }}>
        ยอดชำระเงินรวม : {formatMoney(total)}
      </h1>
      {products.map((data) => {
        return <Item key={data.id} {...data} />;
      })}
    </div>
  );
}
