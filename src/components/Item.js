import "./Item.css";
import { useCart } from "../contact/CartContext";

export default function Item(props) {
  const { id, name, price, image, quantity } = props;
  const { formatMoney } = useCart();

  return (
    <div className="card">
      <img src={image} alt={id} />
      <div className="product">
        <p className="name">ชื่อสินค้า : {name}</p>
        <p className="price">ราคา : {formatMoney(price)} บาท</p>
      </div>
      <div className="quantity">
        <button>+</button>
        <input type="text" value={quantity} disabled></input>
        <button>-</button>
      </div>
      <div className="total-price">{formatMoney(quantity * price)}</div>
      <button>ลบสินค้า</button>
    </div>
  );
}
