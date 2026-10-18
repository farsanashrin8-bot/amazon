
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Adminl() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      navigate('/admin')
    } else {
      alert('Invalid username or password')
    }
  }

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-dark w-100" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Adminl
