import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'




function Productdetails({product,cart,setCart,wishlist,setWishlist}) {
const {id}=useParams()
const[apiproduct,setapiproducts]=useState([])
useEffect(()=>{
    axios.get('https://dummyjson.com/products?limit=20').then((res)=>{
        setapiproducts(res.data.products)
    })
    .catch((error)=>{
        console.log(error);
        
    })

},[])
const allProducts=[...product,...apiproduct]
const item=allProducts.find((pro)=>String(pro.id)==id)
if(!item){
return(
<>

<Header cart={cart} wishlist={wishlist}/>
<div className='container mt-5'>
    <h4>product not found</h4>
    <Link to="/" className='btn btn-dark'>Back to Home</Link>
</div>

</>  
  )
}
return(
    <>
    <Header cart={cart} wishlist={wishlist}/>
    <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src={item.thumbnail || item.image}
              alt={item.title}
              className="img-fluid"
              style={{ maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>

          <div className="col-md-6">
            <h2>{item.title}</h2>
            <h4 className="text-success">₹{item.price}</h4>
            <p>⭐ {item.rating ?? 'No rating'}</p>
            <p>{item.description || 'No description available'}</p>
<div className='d-flex align-items-center justify-content-between'>
  
<button
  className="btn btn-light"
  onClick={() => {
    const exists = wishlist.some((pro) => pro.id === item.id)

    if (exists) {
      setWishlist(wishlist.filter((pro) => pro.id !== item.id))
      alert('Removed from Wishlist')
    } else {
      setWishlist([...wishlist, item])
      alert('Added to Wishlist')
    }
  }}
>
  <i
    className="fa-solid fa-heart"
    style={{
      color: wishlist.some((pro) => pro.id === item.id)
        ? 'red'
        : 'gray'
    }}
  ></i>
</button>
<button
  className="btn btn-light"
  onClick={() => {
    setCart([...cart, item])
    alert('Added to Cart')
  }}
>
  <i className="fa-solid fa-cart-shopping text-warning"></i>
</button>
</div>
            {/* <button
              className="btn btn-warning me-2"
              onClick={() => {
                setCart([...cart, item])
                alert('Product added to cart')
              }}
            >
              Add to Cart
            </button> */}

            <Link to="/" className="btn btn-warning">
              Back to Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
)
}
export default Productdetails