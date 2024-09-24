import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postProduct } from '../../slices/productSlice';
import './PostProduct.css';  // Import CSS file

const PostProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', description: '', image: '' });
  const dispatch = useDispatch();
  const a=useSelector(state=> state)
  console.log(a);
  

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postProduct(product));
  };

  return (
    <div className="form-container">
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

export default PostProduct;
