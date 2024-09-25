import React, { useState } from "react";
import './UpdateProductModal.css';  // Add styles for modal if necessary

const UpdateProductModal = ({ product, onClose, onUpdate }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...product, ...updatedProduct });  // Pass the updated product details
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={updatedProduct.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={updatedProduct.image}
              onChange={handleChange}
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;
