
import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'

function Cart({ cart, setcart }) {

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  )

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${id}`)

      setcart(cart.filter((item) => item.id !== id))
    } catch (error) {
      console.log(error)
      alert('Product is not removed')
    }
  }

  
const updateQuantity = async (item, quantity) => {
  if (quantity < 1) return

  try {
    const response = await axios.patch(
      `http://localhost:3000/cart/${item.id}`,
      { quantity: quantity }
    )

    setcart((prevCart) =>
      prevCart.map((pro) =>
        pro.id === item.id ? response.data : pro
      )
    )
  } catch (error) {
    console.log(error)
    alert('Quantity is updated')
  }
}


  return (
    <>
      <Header cart={cart} />

      <div className="container mt-4">
        <h2 className="mb-4">Shopping Cart</h2>

        {cart.length === 0 ? (
          <div className="text-center mt-5">
            <h4>Your cart is empty!</h4>
            <p>Add some products to your cart.</p>

            <Link to="/" className="btn btn-dark mt-2">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <div
                className="card mb-3 p-3"
                key={item.id}
              >
                <div className="row align-items-center">
                  <div className="col-4 col-md-2">
                    <img
                      src={item.thumbnail || item.image}
                      alt={item.title}
                      className="img-fluid"
                      style={{
                        height: '100px',
                        width: '100%',
                        objectFit: 'contain'
                      }}
                    />
                  </div>

                  <div className="col-8 col-md-6">
                    <h5>{item.title}</h5>

                    <p className="text-success fw-bold">
                      ₹{item.price}
                    </p>

                    <p>
                      Subtotal: ₹
                      {(item.price * (item.quantity || 1)).toFixed(2)}
                    </p>
                  </div>

                  <div className="col-6 col-md-2">
                    <div className="d-flex align-items-center gap-2">
                      <button
                        className="btn btn-outline-dark"
                        disabled={(item.quantity || 1) <= 1}
                        onClick={() =>
                          updateQuantity(
                            item,
                            (item.quantity || 1) - 1
                          )
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity || 1}</span>

                      <button
                        className="btn btn-outline-dark"
                        onClick={() =>
                          updateQuantity(
                            item,
                            (item.quantity || 1) + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-6 col-md-2 mt-2 mt-md-0">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-end mt-4 mb-5">
              <h4>Total: ₹{total.toFixed(2)}</h4>

              <Link
                to="/checkout"
                className="btn btn-warning mt-2"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart