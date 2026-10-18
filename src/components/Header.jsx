import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Header({cart=[],wishlist=[],search,setSearch}) {
   const navigate = useNavigate()
  return (
  <nav className='navbar navbar-dark bg-dark px-4 py-3'>
    <Link to="/" className='navbar-brand fw-bold fs-3'>
    <span className='text-warning'>Shop</span>Zone</Link>
    <input type="text" placeholder="Search products..." className="form-control" style={{ width: "250px" }} value={search} onChange={(e) => setSearch(e.target.value)}
/>
    <div className='d-flex align-items-center gap-4'>
        <Link
  to={localStorage.getItem('isAdmin') === 'true' ? '/admin' : '/adminlogin'}
  className="text-white text-decoration-none"
>
  Admin
</Link>
        <Link to="/wishlist" className="text-white text-decoration-none">
  <i className="fa-solid fa-heart" style={{color: "rgb(255, 212, 59)"}}></i> 
  <span className=" ms-1">
    {wishlist.length}
  </span>
</Link>
        <Link to="/cart" className='text-white text-decoration-none'><i className="fa-solid fa-cart-shopping" style={{color: "rgb(255, 212, 59)"}}></i>{cart.length}</Link>
<Link to="/myorders" className="btn btn-warning">
  Track Order
</Link>
<button
  className="btn btn-info"
  onClick={() => {
    if (localStorage.getItem('isAdmin') === 'true') {
      navigate('/adminorders')
    } else {
      navigate('/adminlogin')
    }
  }}
>
  Admin Orders
</button>
    </div>
    
  </nav>
   
  )
}

export default Header