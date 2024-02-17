# Shopping Application

- ระบบตะกร้าสินค้า
  - บอกปริมาณสินค้าในตะกร้า ณ ที่จะซื้อทั้งหมด
  - จำนวนสินค้าและราคา และยอดรวมตามจำนวนที่ต้องชำระ (จำนวนราคาสินค้ามารวมกัน)
  - เพิ่ม/ลด รายการสินค้า และคำนวณยอดทั้งหมดที่ต้องชำระ แสดงยอดเงินอัตโนมัติ
  - ถ้ากดลบ จำนวนสินค้าน้อยกว่าหรือเท่ากับ 0 สินค้าในตะกร้าชิ้นนั้นจะหายไป

```sh
npm install -g create-react-app
create-react-app my-app && cd my-app
npm install && npm start
```

public/index.html

```html
<head>
  <title>Shopping Application</title>
</head>
```

App.js

```js
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  )
}

export default App
```

components/Header.js

```js
import './Header.css'

export default function Header() {
  return (
    <header>
      <p>Shopping Application</p>
      <p>สินค้าในตะกร้า : {'0'}</p>
    </header>
  )
}
```

components/Header.css

```css
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: auto;
  padding: 10px;
  height: 70px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
  font-weight: bold;
}
```

#### กำหนดข้อมูลสินค้าแบบ Object

ข้อมูลสำหรับทดสอบ React-Hooks ภายในแอปพลิเคชัน เช่น

- useState()
- useEffect()
- useContext()
- useReducer()

data/products.js

```js
const products = [
  {
    id: 1,
    name: 'หมวก',
    image: 'assets/product1.png',
    price: 2000,
    quantity: 1,
  },
  {
    id: 2,
    name: 'หูฟัง',
    image: 'assets/product2.jpg',
    price: 1500,
    quantity: 1,
  },
  {
    id: 3,
    name: 'กระเป๋า',
    image: 'assets/product3.jpeg',
    price: 1000,
    quantity: 1,
  },
]

export default products
```

เพิ่มรูปภาพ

- public/assets/product1.png
- public/assets/product2.png
- public/assets/product3.png

#### โครงสร้าง Context & Reducer

Component --> ส่ง (action) --> Reducer --> ส่ง (state) --> Context -- ส่ง (props) --> กลับไปยัง Component

- createContext, useContext
- useReducer

context/CartContext.js

```js
import { createContext, useContext } from 'react'

const CartContext = createContext() //สร้าง Context

//การนำเอา Context ไปใช้งานกับ Components อื่น
export const useCart = () => {
  return useContext(CartContext)
}
```

reducer/cartReducer.js

```js
const CartReducer = (state, action) => {
  // กระบวนการจัดการ state ผ่าน action
}

export default CartReducer
```

#### ข้อมูล State ที่เก็บใน Context

ชื่อ State : ความหมาย

- products: สินค้าในตะกร้า
- total: จำนวนเงินรวมทั้งหมด
- amount: จำนวนสินค้าในตะกร้าทั้งหมด

context/CartContext.js

```js
import products from '../data/products' // นำข้อมูลตัวแปร products แบบ object มาใช้งาน

// กำหนดค่าเริ่มต้นให้กับ State(Context)
const initState = {
  products: products,
  total: 0,
  amount: 0,
}
```

#### สร้าง Provider

context/CartContext.js

```js
import { createContext, useContext, useReducer, useEffect } from 'react'
import products from '../data/products'
import cartReducer from '../reducer/cartReducer'

const CartContext = createContext()

const initState = {
  products: products,
  total: 0,
  amount: 0,
}
//สร้าง Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState)

  return (
    <CartContext.Provider value={{ ...state }}>{children}</CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
```

index.js

```js
import { CartProvider } from './contact/CartContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
)
```

#### สร้าง Component ตะกร้าสินค้า

- แสดงข้อมูลสินค้าในตะกร้า

components/Cart.js

```js
import Item from './Item'

export default function Cart() {
  return (
    <div className="cart">
      <h1 style={{ textAlign: 'center' }}>{''}</h1>
      {''}
    </div>
  )
}
```

components/Item.js

```js
import './Item.css'

export default function Item(props) {
  return (
    <div className="card">
      <img src={''} alt={id} />
      <div className="product">
        <p className="name">ชื่อสินค้า : {''}</p>
        <p className="price">ราคา : {''} บาท</p>
      </div>
      <div className="total-price">{''}</div>
    </div>
  )
}
```

components/Item.css

```css
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  border-radius: 5px;
  margin: 10px 65px;
  padding: 15px;
}

img {
  width: 150px;
  height: 100px;
  margin-left: 10px;
}

.product {
}

.name {
  width: 120px;
  margin-right: 10px;
}

.price {
}

.quantity {
  margin-right: 60px;
}

input {
  border: none;
  text-align: center;
  width: 32px;
  font-size: 15px;
}

button {
  border: none;
  background: red;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.text {
}

.total-price {
}
```

#### จัดรูปแบบการแสดงผลตัวเลข

context/CartContext.js

```js
import { createContext, useContext, useReducer, useEffect } from 'react'
import products from '../data/products'
import cartReducer from '../reducer/cartReducer'

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState)

  //TODO:
  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <CartContext.Provider value={{ ...state, formatMoney }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
```

components/Cart.js

```js
const { products, total, formatMoney } = useCart() //TODO:

return (
  <div className="cart">
    <h1 style={{ textAlign: 'center' }}>
      {products.length > 0
        ? `ยอดรวมชำระ : ${formatMoney(total)}`
        : 'ไม่มีสินค้า'}
    </h1>
    {products.map((data) => {
      return <Item key={data.id} {...data} />
    })}
  </div>
)
```

components/Item.js

```js
import { useCart } from '../contact/CartContext'

export default function Item(props) {
  const { id, name, price, image, quantity } = props
  const { formatMoney } = useCart() //TODO:

  return (
    <div className="card">
      <img src={image} alt={id} />
      <div className="product">
        <p className="name">ชื่อสินค้า : {name}</p>
        <p className="price">ราคา : {formatMoney(price)} บาท</p>
      </div>
      <div className="total-price">{formatMoney(quantity * price)}</div>
    </div>
  )
}
```

#### คำนวณยอดรวม (Reducer)

- จำนวนเงิน = ราคาสินค้า x ปริมาณสินค้า
- จำนวนสินค้าในตะกร้า = ปริมาณสินค้าแต่ละรายการ

- totalprice = price x quantity
- amount = quantity

context/CartContext.js

```js
//TODO:
useEffect(() => {
  console.log('คำนวณหาผลรวม')
  dispatch({ type: 'CALCULATE_TOTAL' })
}, [state.products])
```

reducer/cartReducer.js

```js
// กระบวนการจัดการ state ผ่าน action
if (action.type === 'CALCULATE_TOTAL') {
  const { total, amount } = state.products.reduce(
    (cartTotal, item) => {
      const { price, quantity } = item
      const totalPrice = price * quantity // ยอดรวมสินค้าแต่ละรายการ
      cartTotal.total += totalPrice // จำนวนเงินรวม
      cartTotal.amount += quantity // ปริมาณรวม
      return cartTotal
    },
    {
      total: 0,
      amount: 0,
    }
  )
  return {
    ...state,
    total,
    amount,
  }
}
```

#### แสดงยอดรวม & จำนวนรวมสินค้า

components/Cart.js

```js
import Item from './Item'
import { useCart } from '../contact/CartContext'

export default function Cart() {
  const { products, total, formatMoney } = useCart()

  return (
    <div className="cart">
      <h1 style={{ textAlign: 'center' }}>
        {products.length > 0
          ? `ยอดรวมชำระ : ${formatMoney(total)}`
          : 'ไม่มีสินค้า'}
      </h1>
      {products.map((data) => {
        return <Item key={data.id} {...data} />
      })}
    </div>
  )
}
```

components/Header.js

```js
import './Header.css'
import { useCart } from '../contact/CartContext'

export default function Header() {
  const { amount } = useCart()

  return (
    <header>
      <p>Shopping Application</p>
      <p>สินค้าในตะกร้า : {amount}</p>
    </header>
  )
}
```

#### ลบสินค้าจากตะกร้า

context/CartContext.js

```js
import { createContext, useContext, useReducer, useEffect } from 'react'
import products from '../data/products'
import cartReducer from '../reducer/cartReducer'

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState)

  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  //TODO:
  function removeItem(id) {
    dispatch({ type: 'REMOVE', payload: id })
  }

  useEffect(() => {
    console.log('คำนวณหาผลรวม')
    dispatch({ type: 'CALCULATE_TOTAL' })
  }, [state.products])

  return (
    <CartContext.Provider
      value={{
        ...state,
        formatMoney,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
```

components/Item.js

```js
import { useCart } from '../contact/CartContext'

export default function Item(props) {
  const { id, name, price, image, quantity } = props
  const { formatMoney } = useCart()

  return (
    <div className="card">
      <img src={image} alt={id} />
      <div className="product">
        <p className="name">ชื่อสินค้า : {name}</p>
        <p className="price">ราคา : {formatMoney(price)} บาท</p>
      </div>
      <div className="total-price">{formatMoney(quantity * price)}</div>
      <button onClick={() => removeItem(id)}>ลบสินค้า</button> //TODO:
    </div>
  )
}
```

reducer/cartReducer.js

```js
if (action.type === 'REMOVE') {
  return {
    ...state,
    products: state.products.filter((item) => item.id !== action.payload),
  }
}
```

#### เพิ่มสินค้าจากตะกร้า

context/CartContext.js

```js
import { createContext, useContext, useReducer, useEffect } from 'react'
import products from '../data/products'
import cartReducer from '../reducer/cartReducer'

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState)

  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE', payload: id })
  }

  //TODO:
  function addQuantity(id) {
    dispatch({ type: 'ADD', payload: id })
  }

  useEffect(() => {
    console.log('คำนวณหาผลรวม')
    dispatch({ type: 'CALCULATE_TOTAL' })
  }, [state.products])

  return (
    <CartContext.Provider
      value={{
        ...state,
        formatMoney,
        removeItem,
        addQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}
```

components/Item.js

```js
import { useCart } from '../contact/CartContext'

export default function Item(props) {
  const { id, name, price, image, quantity } = props
  const { formatMoney, removeItem, addQuantity } = useCart()

  return (
    <div className="card">
      <img src={image} alt={id} />
      <div className="product">
        <p className="name">ชื่อสินค้า : {name}</p>
        <p className="price">ราคา : {formatMoney(price)} บาท</p>
      </div>
      <div className="quantity">
        <button onClick={() => addQuantity(id)}>+</button>
        <input type="text" value={quantity} disabled></input>
      </div>
      <div className="total-price">{formatMoney(quantity * price)}</div>
      <button onClick={() => removeItem(id)}>ลบสินค้า</button>
    </div>
  )
}
```

reducer/cartReducer.js

```js
if (action.type === 'ADD') {
  let updateProduct = state.products.map((item) => {
    if (item.id === action.payload) {
      return {
        ...item,
        quantity: item.quantity + 1,
      }
    }
    return item
  })
  return {
    ...state,
    products: updateProduct,
  }
}
```

#### ลดปริมาณสินค้า

context/CartContext.js

```js
import { createContext, useContext, useReducer, useEffect } from 'react'
import products from '../data/products'
import cartReducer from '../reducer/cartReducer'

const CartContext = createContext()

const initState = {
  products: products,
  total: 0,
  amount: 0,
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState)

  function formatMoney(money) {
    return money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  function removeItem(id) {
    dispatch({ type: 'REMOVE', payload: id })
  }

  function addQuantity(id) {
    dispatch({ type: 'ADD', payload: id })
  }

  function subtractQuantity(id) {
    dispatch({ type: 'SUBTRACT', payload: id })
  }

  useEffect(() => {
    console.log('คำนวณหาผลรวม')
    dispatch({ type: 'CALCULATE_TOTAL' })
  }, [state.products])

  return (
    <CartContext.Provider
      value={{
        ...state,
        formatMoney,
        removeItem,
        addQuantity,
        subtractQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// การนำเอา context ไปใช้งานด้านนอก
export const useCart = () => {
  return useContext(CartContext)
}
```

components/Item.js

```js
import './Item.css'
import { useCart } from '../contact/CartContext'

export default function Item(props) {
  const { id, name, price, image, quantity } = props
  const { formatMoney, removeItem, addQuantity, subtractQuantity } = useCart()

  return (
    <div className="card">
      <img src={image} alt={id} />
      <div className="product">
        <p className="name">ชื่อสินค้า : {name}</p>
        <p className="price">ราคา : {formatMoney(price)} บาท</p>
      </div>
      <div className="quantity">
        <button onClick={() => addQuantity(id)}>+</button>
        <input type="text" value={quantity} disabled></input>
        <button onClick={() => subtractQuantity(id)}>-</button>
      </div>
      <div className="total-price">{formatMoney(quantity * price)}</div>
      <button onClick={() => removeItem(id)}>ลบสินค้า</button>
    </div>
  )
}
```

reducer/cartReducer.js

```js
if (action.type === 'SUBTRACT') {
  let updateProduct = state.products
    .map((item) => {
      if (item.id === action.payload) {
        return {
          ...item,
          quantity: item.quantity - 1,
        }
      }
      return item
    })
    .filter((item) => item.quantity !== 0)
  return {
    ...state,
    products: updateProduct,
  }
}
```
