import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import { Link } from 'react-router-dom'



function Home({ product,cart,setCart,wishlist,setWishlist }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
 const [category, setCategory] = useState('all')
 const [sort, setSort] = useState('default')

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=20')
      .then((response) => {
        setProducts(response.data.products)
      })
      .catch((err) => {
        setError('Products is not loaded')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const allProducts = [...product, ...products]
  const filteredProducts = allProducts.filter((item) =>
  item.title.toLowerCase().includes(search.toLowerCase()) && (category=='all'|| item.category==category)
)

const sortedProduct=[...filteredProducts].sort((a,b)=>{
  if(sort=='low') return a.price-b.price
  if(sort=='high') return b.price-a.price
  return 0
})

  return (
    <>
      <Header cart={cart} wishlist={wishlist} search={search} setSearch={setSearch}/>

      <div className="container mt-4">
        <div className="p-5 bg-warning rounded">
          <h1 className="fw-bold">Welcome to ShopZone!</h1>
          <p>Find your favourite products at the best prices.</p>
        </div>

        <h3 className="mt-4 mb-3">Our Products</h3>

        <select className='form-select mb-4' style={{maxWidth:'250px'}} value={category} onChange={(e)=>setCategory(e.target.value)}>
          <option value='all'>ALL Categories</option>
          {[...new Set(allProducts.map((item)=>item.category).filter(Boolean))].map((cat)=>(<option key={cat} value={cat}>{cat}</option>))}
        </select>
        <select className='form-select mb-4' style={{maxWidth:'250px'}} value={sort} onChange={(e)=>setSort(e.target.value)}>
          <option value='default'> Default Sorting</option>
          <option value='low'> Price:Low to High</option>
          <option value='high'> Price:High to Low</option>
        </select>

        {loading && <p>Loading products...</p>}

        {error && <p className="text-danger">{error}</p>}

        <div className="row">
          {!loading && sortedProduct.map((item, index) => (
            <div className="col-md-4 col-lg-3 mb-4" key={item.id ?? index}>
              <div className="card h-100 shadow-sm">
                <Link to={`/product/${item.id}`}>
                <img
                  src={item.thumbnail || item.image}
                  className="card-img-top p-3"
                  alt={item.title}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
                </Link>
                

                <div className="card-body d-flex flex-column flex-grow-1 ">
                 
                
<button
  className="btn btn-light border align-self-end mb-2"
  onClick={async () => {
    const exists = wishlist.some(
      (pro) => pro.productId === item.id
    )

    try {
      if (exists) {
        const wishlistItem = wishlist.find(
          (pro) => pro.productId === item.id
        )

        await axios.delete(
          `http://localhost:3000/wishlist/${wishlistItem.id}`
        )

        setWishlist((prev) =>
          prev.filter((pro) => pro.id !== wishlistItem.id)
        )
      } else {
        const response = await axios.post(
          'http://localhost:3000/wishlist',
          {
            productId: item.id,
            title: item.title,
            price: item.price,
            thumbnail: item.thumbnail || item.image,
            category: item.category
          }
        )

        setWishlist((prev) => [...prev, response.data])
      }
    } catch (error) {
      console.log(error)
      alert('Wishlist is updated')
    }
  }}
>
  <i
    className={`fa-heart ${
      wishlist.some((pro) => pro.productId === item.id)
        ? 'fa-solid text-danger'
        : 'fa-regular'
    }`}
  ></i>
</button>
                  <h5 className="card-title"><Link to={`/product/${item.id}`} className='text-dark text-decoration-none'>{item.title}</Link></h5>
                  <p className="text-success fw-bold">₹{item.price}</p>
                  <p>⭐ {item.rating ?? 'No rating'}</p>
                  <p>{item.category}</p>
                 <button
  className="btn btn-warning w-100 mt-auto"
 onClick={async () => {
  try {
    const response = await axios.post(
      'http://localhost:3000/cart',
      {
        productId: item.id,
        title: item.title,
        price: item.price,
        thumbnail: item.thumbnail || item.image,
        category: item.category,
        quantity: 1
      }
    )

    setCart((prevCart) => [...prevCart, response.data])
    alert('Product added to cart!')
  } catch (error) {
    console.log(error)
    alert('Product is not added')
  }
}}
>
  Add to Cart
</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home