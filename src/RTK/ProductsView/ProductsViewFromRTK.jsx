import React, { useState } from 'react';
import { useDeleteProductdByIdMutation, useGetProductsQuery, useUpdateProductByIdMutation } from '../slices/productApiSlice';
import '../../../src/Components/ProductsView/ProductsView.css'
import UpdateProductModal from '../../Components/ProductsView/UpdateProductModal';
const ProductsViewFromRTK = () => {
    let { data: products, isError, isLoading, error, refetch } = useGetProductsQuery()
    let [deleteProductById] = useDeleteProductdByIdMutation()
    let [updateProductById]=useUpdateProductByIdMutation()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // console.log(error.status);

    const handleDelete = async (id) => {
        try {
            deleteProductById(id).unwrap()
                .then(res => {
                    console.log('deleted');
                    refetch()
                })

        } catch (error) {
            console.log(error);

        }
    }



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
        console.log(updatedProduct);
        
        updateProductById({ id: updatedProduct._id, productData: updatedProduct }).unwrap()
        .then(res=>{
            console.log('updated');
            refetch()
        })
        .catch(err=>{
            console.log(err);
            
        })
        handleModalClose();  // Close the modal after updating
      };

      

    if (isLoading) {
        return <h1> Loading...</h1>
    }
    if (isError) {
        return <h2>{error.data.message}</h2>
    }
    return (
        <div>
            <div className="table-container ">

                <h3>Total Products: {products.length}</h3>
                <h2>Products List</h2>
                <table className="product-table" style={{ overflowX: 'scroll' }}>
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
                                        <button className="update-btn" onClick={()=> handleUpdate(product)}>
                                            Update
                                        </button>
                                        <button className="delete-btn" onClick={() => handleDelete(product._id)}>
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
                {isModalOpen && selectedProduct && (
                    <UpdateProductModal
                        product={selectedProduct}
                        onClose={handleModalClose}
                        onUpdate={handleProductUpdate}
                    />
                )}

            </div>
        </div>
    );
};

export default ProductsViewFromRTK;