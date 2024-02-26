import './Item.css'
import { useCart } from '../contact/CartContext'
import { IoTrashBin } from 'react-icons/io5'

export default function Item(props) {
  const { id, name, price, image, quantity } = props
  const { formatMoney, removeItem, addQuantity, subtractQuantity } = useCart()

  return (
    <div style={{ margin: '10px' }}>
      <div className="card">
        <img src={image} alt={id} />
        <div>
          <p>สินค้า : {name}</p>
          <p>ราคา : {formatMoney(price)} บาท</p>
        </div>
        <div>
          <button onClick={() => addQuantity(id)}>+</button>
          <input type="text" value={quantity} disabled></input>
          <button onClick={() => subtractQuantity(id)}>-</button>
        </div>
        <div>{formatMoney(quantity * price)}</div>
        <button onClick={() => removeItem(id)}>
          <IoTrashBin />
        </button>
      </div>
    </div>
  )
}
