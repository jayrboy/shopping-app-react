import Item from './Item'
import { useCart } from '../contact/CartContext'

export default function Cart() {
  const { products, total, formatMoney } = useCart()

  return (
    <div className="cart" style={{ textAlign: 'center' }}>
      <h1>ระบบตะกร้าสินค้า</h1>
      {products.map((data) => {
        return <Item key={data.id} {...data} />
      })}
      <h1>
        {products.length > 0
          ? `ยอดรวมชำระ : ${formatMoney(total)}`
          : 'ไม่มีสินค้า'}
      </h1>
    </div>
  )
}
