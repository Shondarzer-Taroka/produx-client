// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, getAllProduct, updateProduct } from "../../slices/productSlice";
// import './ProductsView.css';  // Import the CSS file for styling
// import Modal from "./UpdateProductModal";  // Import the modal component

// const ProductsView = () => {
//   const { products, error, isLoading } = useSelector((state) => state.products);
//   const dispatch = useDispatch();

//   // State to handle modal visibility and selected product
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   useEffect(() => {
//     dispatch(getAllProduct());
//   }, [dispatch]);

//   const handleDelete = (product) => {
//     dispatch(deleteProduct(product._id));
//   };

//   const handleUpdate = (product) => {
//     // Set selected product and open the modal
//     setSelectedProduct(product);
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="table-container">
//       <h3>Total Products: {products.length}</h3>
//       <h2>Products List</h2>
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Price</th>
//             <th>Description</th>
//             <th>Image</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {products.length > 0 ? (
//             products.map((product, index) => (
//               <tr key={product._id}>
//                 <td>{index + 1}</td>
//                 <td>{product.name}</td>
//                 <td>${product.price}</td>
//                 <td>{product.description}</td>
//                 <td>
//                   <img src={product.image} alt={product.name} className="product-image" />
//                 </td>
//                 <td>
//                   <button className="update-btn" onClick={() => handleUpdate(product)}>
//                     Update
//                   </button>
//                   <button className="delete-btn" onClick={() => handleDelete(product)}>
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No products available</td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Modal for updating the product */}
//       {isModalOpen && selectedProduct && (
//         <Modal
//           product={selectedProduct}
//           onClose={handleModalClose}
//           onUpdate={(updatedProduct) => {
//               // Dispatch the update action
//           dispatch(updateProduct({ id: updatedProduct._id, productData: updatedProduct}))
//             handleModalClose();  // Close the modal after updating
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductsView;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProduct, updateProduct } from "../../slices/productSlice";
import Modal from "./UpdateProductModal";
import  './ProductsView.css'
import toast, { Toaster } from "react-hot-toast";


const ProductsView = () => {
  const { products, error, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  // State to handle modal visibility and selected product
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  const handleDelete = (product) => {
    dispatch(deleteProduct(product._id));
  };

  const handleUpdate = (product) => {
    // Set selected product and open the modal
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleProductUpdate = (updatedProduct) => {
    // Dispatch the update action
    dispatch(updateProduct({ id: updatedProduct._id, productData: updatedProduct }))
      .unwrap()
      .then(() => {
        // Show success toast on successful update
        toast.success("Product updated successfully!");
        console.log('Product updated successfully!');
        
      })
      .catch((error) => {
        // Show error toast if the update fails
        toast.error(`Failed to update product: ${error.message}`);
      });

    handleModalClose();  // Close the modal after updating
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="table-container">
       <Toaster/>
      <h3>Total Products: {products.length}</h3>
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
            products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.image} alt={product.name} className="product-image" />
                </td>
                <td>
                  <button className="update-btn" onClick={() => handleUpdate(product)}>
                    Update
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(product)}>
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

      {/* Modal for updating the product */}
      {isModalOpen && selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={handleModalClose}
          onUpdate={handleProductUpdate}
        />
      )}
    </div>
  );
};

export default ProductsView;
