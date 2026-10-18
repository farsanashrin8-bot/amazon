
import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import axios from 'axios'



function Checkout({ cart, setcart }) {
    
  const [ordersplaced,setorderedplaced]=useState(false)
const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1),0)


const handleorder = async (e) => {
  e.preventDefault()

  const neworder = {
    items: [...cart],
    total: total,
    status: "Order Placed",
    date: new Date().toLocaleDateString()
  }

  try {
    await axios.post('http://localhost:3000/orders', neworder)
    setorderedplaced(true)
    setcart([])
  } catch (error) {
    console.log("Order error:", error)
    alert("Order is not placed: " + error.message)
  }
}

  return (
    <>
      <Header cart={cart} />

      <div className="container mt-4">
        <h2>Checkout</h2>

        <div className="row mt-4">
          <div className="col-md-7">
            <div className="card p-4">
              <h4>Delivery Address</h4>

             <form
                 onSubmit={handleorder}>
                             <input type="text" className="form-control mb-3" placeholder="Full Name" required />


                <input
                  type="tel"
                  className="form-control mb-3"
                  placeholder="Phone Number"
                  required
                />

                <textarea
                  className="form-control mb-3"
                  placeholder="Full Address"
                  rows="3"
                  required
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="PIN Code"
                  required
                />

                <button type="submit" className="btn btn-warning w-100">
                  Place Order
                </button>
              </form>
              {
                ordersplaced && (
                  <div className='alert alert-success mt-4'>
                    <h4>Order Placed Successfully !</h4>
                    <p>Thank You For Shopping with us</p>
                    <Link to="/" className='btn btn-success'>Continue shopping</Link>
                    </div>
                )
              }
            </div>
          </div>

          <div className="col-md-5 mt-4 mt-md-0">
            <div className="card p-4">
              <h4>Order Summary</h4>

              {cart.map((item, index) => (
                <p key={`${item.id}-${index}`}>
                  {item.title} × {item.quantity || 1}
                  <span className="float-end">
                    ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </p>
              ))}

              <hr />

              <h5>
                Total: <span className="text-success">₹{total.toFixed(2)}</span>
              </h5>

              <Link to="/cart" className="btn btn-outline-dark mt-3">
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout