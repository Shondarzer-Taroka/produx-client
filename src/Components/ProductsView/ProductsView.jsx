import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct } from "../../slices/productSlice";
import './ProductsView.css';  // Import the CSS file for styling

const ProductsView = () => {
  let { products, error, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  console.log(products);
  
  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const handleDelete = (id) => {
    // Logic to delete a product by id
    console.log("Delete product with id:", id);
    // You'd dispatch a delete action here
  };

  const handleUpdate = (id) => {
    // Logic to update a product by id
    console.log("Update product with id:", id);
    // You'd navigate to an update form or dispatch an update action
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
      <h2>Products List</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.image} alt={product.name} className="product-image" />
                </td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdate(product.id)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsView;
