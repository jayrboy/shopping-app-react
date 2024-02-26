import './Header.css'
import { useCart } from '../contact/CartContext'
import { GiShoppingCart } from 'react-icons/gi'

export default function Header() {
  const { amount } = useCart()

  return (
    <header>
      <p>Shopping Application</p>
      <p>
        <GiShoppingCart /> ตะกร้าสินค้า : {amount}
      </p>
    </header>
  )
}
