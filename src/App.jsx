import React, { useEffect, useState } from 'react'
import './App.css'
import Admin from './page/Admin'
import { Route, Routes } from 'react-router-dom'
import Edit from './page/Edit'
import Home from './page/Home'
import Cart from './page/Cart'
import Wishlist from './page/Wishlist'
import Productdetails from './page/Productdetails'
import Checkout from './page/Checkout'
import Myorder from './page/Myorder'
import AdminOrders from './page/Adminorder'
import ProtectedRoute from './components/ProtectedRoute'
import Adminl from './page/Adminl'
import axios from 'axios'







function App() {
  const [product, setproduct] = useState([])
  useEffect(() => {
  axios.get('http://localhost:3000/products')
    .then((response) => {
      setproduct(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [])
useEffect(() => {
  axios.get('http://localhost:3000/cart')
    .then((response) => setcart(response.data))
    .catch((error) => console.log(error))

  axios.get('http://localhost:3000/wishlist')
    .then((response) => setWishlist(response.data))
    .catch((error) => console.log(error))
}, [])
  const [cart, setcart] = useState([])
  const[wishlist,setWishlist]=useState([])

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
            wishlist={wishlist}
            setWishlist={setWishlist}
              product={product}
              cart={cart}
              setCart={setcart}
            />
          }
        />

        <Route path='/admin' element={
  <ProtectedRoute><Admin product={product} setproduct={setproduct}/></ProtectedRoute>
}/>
      <Route path="/edit/:id" element={
    <ProtectedRoute>
      <Edit product={product} setproduct={setproduct} />
    </ProtectedRoute>
  }
/>
         <Route
          path="/cart"
          element={
            <Cart cart={cart} setcart={setcart} />
          }
        />
        <Route
  path="/wishlist"
  element={
    <Wishlist
      wishlist={wishlist}
      setWishlist={setWishlist}
      cart={cart}
      setcart={setcart}
    />
  }
/>
<Route
  path="/product/:id"
  element={
    <Productdetails
      product={product}
      cart={cart}
      setCart={setcart}
      wishlist={wishlist}
      setWishlist={setWishlist}
    />
  }
/>
<Route
  path="/checkout"
  element={<Checkout cart={cart} setcart={setcart} />}
/>
<Route path="/myorders" element={<Myorder />} />
<Route
  path="/adminorders"
  element={
    <ProtectedRoute>
      <AdminOrders />
    </ProtectedRoute>
  }
/>
<Route
  path="/adminlogin"
  element={<Adminl />}
/>

      </Routes>
    </>
  )
}

export default App