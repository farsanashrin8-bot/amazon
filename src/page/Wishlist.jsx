import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'


function Wishlist({wishlist,setWishlist,cart,setcart}) {
  const removewishlist = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/wishlist/${id}`)
    setWishlist(wishlist.filter((item) => item.id !== id))
  } catch (error) {
    console.log(error)
    alert('Wishlist is not removed')
  }
}

const addtocart = async (item) => {
  try {
    const response = await axios.post(
      'http://localhost:3000/cart',
      {
        productId: item.productId,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail || item.image,
        category: item.category,
        quantity: 1
      }
    )

    setcart((prev) => [...prev, response.data])

    await axios.delete(
      `http://localhost:3000/wishlist/${item.id}`
    )

    setWishlist((prev) =>
      prev.filter((pro) => pro.id !== item.id)
    )

    alert('Product added to cart!')
  } catch (error) {
    console.log(error)
    alert('Product is addedd')
  }
}

  return (
    <>
      <Header cart={cart} wishlist={wishlist}/>
      <div className="container mt-4">
    <h2 className="mb-4"> My Wishlist</h2>

    {wishlist.length === 0 ? (
  <div className="text-center py-5">
    <img
      src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-download-in-svg-png-gif-file-formats--online-shop-store-shopping-site-marketplace-states-pack-windows-interface-illustrations-9824480.png"
      alt="Empty wishlist"
      style={{ width: "180px", maxWidth: "100%" }}
    />
    <h4 className="mt-3">Your Wishlist is Empty!</h4>
    <p className="text-muted">
      Save your favourite products here.
    </p>
   
  </div>

    ) : (
      <div className="row g-4">
        {wishlist.map((item) => (
          <div className="col-6 col-md-4 col-lg-3" key={item.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.thumbnail || item.image}
                alt={item.title}
                className="card-img-top p-3"
                style={{ height: '180px', objectFit: 'contain' }}
              />

              <div className="card-body d-flex flex-column">
                <h6>{item.title}</h6>
                <p className="text-success fw-bold">₹{item.price}</p>

                <button
                  className="btn btn-warning mb-2 mt-auto"
                  onClick={() => addtocart(item)}
                >
                  Add to Cart
                </button>

                <button
                                  className="btn btn-outline-danger"
                  onClick={() => removewishlist(item.id)}
                >
                 <i className="fa-solid fa-heart" style={{color: "rgb(255, 212, 59)"}}></i>  Remove 
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <Link to="/" className="btn btn-dark mt-4">
      Continue Shopping
    </Link>
  </div>
    </>
  

  )
}

export default Wishlist