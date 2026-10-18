
import axios from 'axios'
import React, {  useState } from 'react'
import {  useNavigate } from 'react-router-dom'



function Admin({product,setproduct}) {
   
    const [title, settitle] = useState('')
    const [price, setprice] = useState('')
    const [category, setcategory] = useState('')
    const [image, setimage] = useState('')
    const [description, setdescription] = useState('')
    const navigate =useNavigate()
    
const handlesubmit = async (e) => {
    e.preventDefault()

    const newproducts = {
        title,
        price: Number(price),
        category: category.toLowerCase(),
        image,
        thumbnail: image,
        description,
        rating: null
    }

    try {
        const response = await axios.post(
            'http://localhost:3000/products',
            newproducts
        )

        setproduct([...product, response.data])

        console.log(response.data)
        alert('Product added successfully!')

        settitle('')
        setprice('')
        setcategory('')
        setimage('')
        setdescription('')

    } catch (error) {
        console.log(error)
        alert('Product save cheyyan pattiyilla. Backend check cheyyuka.')
    }
}



const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/products/${id}`)

    setproduct(product.filter((item) => item.id !== id))

    alert('Product deleted successfully!')
  } catch (error) {
    console.log(error)
    alert('Product delete cheyyan pattiyilla')
  }
}


const handleLogout = () => {
  localStorage.removeItem('isAdmin')
  navigate('/adminlogin')
}



    return (
       
        <div className='container mt-4 mb-5'>
            <h2 className='text-center mb-4'>Admin Dashboard</h2>
            <div className='card shadow p-4 mx-auto' style={{ maxWidth: '650px' }}>
                <h4 className='mb-4'>Add New Product</h4>
                <form onSubmit={handlesubmit}>
                    <label className='form-label'>Product Name</label>
                    <input type='text' className='form-control mb-3' placeholder='enter product name' value={title} onChange={(e) => settitle(e.target.value)} required />
                    <label className='form-label'>Price</label>
                    <input type='number' className='form-control mb-3' placeholder='enter  price' value={price} onChange={(e) => setprice(e.target.value)} required />
                    <label className='form-label'>Category</label>
                    <input type='text' className='form-control mb-3' placeholder='enter  category' value={category} onChange={(e) => setcategory(e.target.value)} required />
                    <label className='form-label'>Product image</label>
                    <input type='url' className='form-control mb-3' placeholder='image url' value={image} onChange={(e) => setimage(e.target.value)}  />
                    <label className='form-label'>Describtion</label>
                    <textarea className='form-control mb-4' rows='3' placeholder='enter product decscribtion' value={description} onChange={(e) => setdescription(e.target.value)} required />
                    <button type='submit' className='btn btn-primary w-100'> Add Product</button>
                      <button className="btn btn-danger text-center mt-2 me-2" onClick={handleLogout}>Logout</button>
                </form>
            </div>
           
            <div className='row mt-4'>
                {product.map((item, index) => (
                    <div className='col-md-4 mb-3' key={index}>
                        <div className='card p-3 h-100'>
                            <img src={item.image} alt={item.title} style={{ height: '180px', objectFit: 'contain' }} />
                            <h5 className='mt-3'>{item.title}</h5>
                            <p>price:{item.price}</p>
                            <p>Cartegory:{item.category}</p>
                            <p>{item.description}</p>
                            <button className='btn btn-warning mt-2 me-2' onClick={()=>navigate(`/edit/${index}`)}>Edit</button>
                           <button className="btn btn-danger mt-2 me-2" onClick={() => handleDelete(item.id)}> Delete</button>
                              
                            
                        </div>


                    </div>
                    
                )
                )

                }
            </div>
            </div>
            
            )
}

            export default Admin