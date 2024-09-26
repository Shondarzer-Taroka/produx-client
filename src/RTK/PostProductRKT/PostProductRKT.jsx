import React, { useState } from 'react';


import '../../../src/Components/PostProduct/PostProduct.css';  // Import CSS file
import { useAddProductMutation } from '../slices/productApiSlice';
import toast, { Toaster } from 'react-hot-toast';

const PostProductRKT = () => {
  const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });
 let [addProduct]=useAddProductMutation()
  

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    console.log(product);
 
    try {
         await addProduct(product).unwrap() 
         toast.success('product added successfully')
    } catch (error) {
        console.log(error);
        toast.error(error.message)
    }
    e.preventDefault();
  };

  return (
    <div className="form-container">
        <Toaster/>
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Create a New Product</h2>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
        </div>

        <div className="form-group">
          <label htmlFor="price">Product Price</label>
          <input name="price" value={product.price} onChange={handleChange} placeholder="Product Price" required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description" />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
        </div>

        <button type="submit" className="submit-button">Create Product</button>
      </form>
    </div>
  );
};

export default PostProductRKT;
