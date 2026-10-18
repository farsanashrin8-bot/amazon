
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'

function AdminOrders() {
  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/orders')
      setOrders(response.data)
    } catch (error) {
      console.log('Orders fetch error:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:3000/orders/${id}`, {
        status: status
      })

      fetchOrders()
      alert('Order status updated!')
    } catch (error) {
      console.log('Status update error:', error)
      alert('Status update failed')
    }
  }

  return (
    <>
      <Header />

      <div className="container mt-4">
        <h2>Manage Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div className="card p-3 mb-3" key={order.id}>
              <h5>Order ID: {order.id}</h5>
              <p>Date: {order.date}</p>
              <p>Total: ₹{Number(order.total).toFixed(2)}</p>
              <p>Current Status: {order.status}</p>

              <select
                className="form-select mb-3"
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value)}
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default AdminOrders
