
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function EditProduct({ product, setproduct }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const selectedProduct = product[Number(id)]

  const [title, settitle] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('')
  const [image, setimage] = useState('')
  const [description, setdescription] = useState('')

  useEffect(() => {
    if (selectedProduct) {
      settitle(selectedProduct.title)
      setprice(selectedProduct.price)
      setcategory(selectedProduct.category)
      setimage(selectedProduct.image)
      setdescription(selectedProduct.description)
    }
  }, [id, product])
const handleUpdate = async (e) => {
  e.preventDefault()

  const updatedProduct = {
    ...selectedProduct,
    title,
    price: Number(price),
    category: category.toLowerCase(),
    image,
    thumbnail: image,
    description
  }

  try {
    const response = await axios.put(
      `http://localhost:3000/products/${selectedProduct.id}`,
      updatedProduct
    )

    const updatedProducts = [...product]
    updatedProducts[Number(id)] = response.data

    setproduct(updatedProducts)
    alert('Product updated successfully!')
    navigate('/admin')
  } catch (error) {
    console.log(error)
    alert('Product update is not updated')
  }
}

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Edit Product</h2>

      <div className="card shadow p-4 mx-auto" style={{ maxWidth: '650px' }}>
        <form onSubmit={handleUpdate}>
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            required
          />

          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control mb-3"
            value={price}
            onChange={(e) => setprice(e.target.value)}
            required
          />

          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control mb-3"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            required
          />

          <label className="form-label">Product Image URL</label>
          <input
            type="url"
            className="form-control mb-3"
            value={image}
            onChange={(e) => setimage(e.target.value)}
            required
          />

          <label className="form-label">Description</label>
          <textarea
            className="form-control mb-3"
            rows="3"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100">
            Update Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
