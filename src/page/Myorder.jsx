
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import { Link } from 'react-router-dom'

function Myorder() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const statuses = [
    'Order Placed',
    'Confirmed',
    'Shipped',
    'Out for Delivery',
    'Delivered'
  ]

  useEffect(() => {
    axios.get('http://localhost:3000/orders')
      .then((response) => {
        setOrders(response.data)
      })
      .catch((error) => {
        console.log('Orders fetch error:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <Header />

      <div className="container mt-4 mb-5">
        <h2 className="text-center mb-4">My Orders</h2>

        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="text-center mt-5">
            <h4>No orders yet!</h4>
            <Link to="/" className="btn btn-warning mt-3">
              Continue Shopping
            </Link>
          </div>
        ) : (
          orders.map((order) => {
            const currentStep = statuses.findIndex(
              (status) =>
                status.toLowerCase() === order.status?.toLowerCase()
            )

            return (
              <div className="card shadow-sm p-4 mb-4" key={order.id}>
                <div className="d-flex justify-content-between flex-wrap">
                  <h5>Order ID: {order.id}</h5>
                  <span className="badge bg-success align-self-start">
                    {order.status}
                  </span>
                </div>

                <p className="text-muted mb-2">
                  Date: {order.date}
                </p>

                <hr />

                <h6 className="mb-3">Order Tracking</h6>

                <div className="d-flex align-items-start justify-content-between flex-wrap gap-2 my-3">
                  {statuses.map((status, index) => {
                    const completed =
                      currentStep !== -1 && index <= currentStep

                    return (
                      <React.Fragment key={status}>
                        <div
                          className="text-center"
                          style={{ flex: '1', minWidth: '75px' }}
                        >
                          <div
                            className={`rounded-circle mx-auto mb-2 ${
                              completed ? 'bg-success' : 'bg-secondary'
                            }`}
                            style={{
                              width: '20px',
                              height: '20px'
                            }}
                          />

                          <small
                            className={
                              completed
                                ? 'text-success fw-bold'
                                : 'text-secondary'
                            }
                          >
                            {status}
                          </small>
                        </div>

                        {index < statuses.length - 1 && (
                          <span
                            className={
                              currentStep > index
                                ? 'text-success'
                                : 'text-secondary'
                            }
                            style={{
                              fontSize: '24px',
                              fontWeight: 'bold'
                            }}
                          >
                            →
                          </span>
                        )}
                      </React.Fragment>
                    )
                  })}
                </div>

                <hr />

                <h6>Products</h6>

                {order.items?.map((item, index) => (
                  <p key={`${item.id}-${index}`}>
                    {item.title} × {item.quantity || 1}
                  </p>
                ))}

                <h5 className="text-success mt-2">
                  Total: ₹{Number(order.total).toFixed(2)}
                </h5>
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

export default Myorder
