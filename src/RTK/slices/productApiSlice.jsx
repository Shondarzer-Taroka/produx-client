import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL}),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/products',
            providesTags: ['Products']
        }),

        addProduct: builder.mutation({
            query: (newProduct) => ({
                url: '/createProduct',
                method: 'POST',
                body: newProduct
            }),
            providesTags: ['Products']
        }),

        updateProductById: builder.mutation({
            query: ({ id, productData }) => ({
                url: `/update/${id}`,
                method: 'PUT',
                body: productData
            }),
            providesTags:['Products']
        }),

        deleteProductdById:builder.mutation({
            query:(id)=>({
                url:`/delete/${id}`,
                method:'DELETE'
            }),
            providesTags:['Products']

        })
    })
})

export let {
useGetProductsQuery,
useUpdateProductByIdMutation,
useAddProductMutation,
useDeleteProductdByIdMutation
}=productsApi


export default productsApi










// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Create an API slice
// export const productsApi = createApi({
//   reducerPath: 'productsApi',  // Unique key to refer to this API slice
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),  // Base URL
//   tagTypes: ['Product'],  // Tags for cache invalidation
//   endpoints: (builder) => ({
//     // Define a query for fetching all products
//     getProducts: builder.query({
//       query: () => '/products',  // API endpoint
//       providesTags: ['Product'],  // Cache tag for invalidation
//     }),
//     // Define a mutation for adding a new product
//     addProduct: builder.mutation({
//       query: (newProduct) => ({
//         url: '/products',
//         method: 'POST',
//         body: newProduct,
//       }),
//       invalidatesTags: ['Product'],  // Invalidate product cache after mutation
//     }),
//     // Define a mutation for updating a product
//     updateProduct: builder.mutation({
//       query: ({ id, productData }) => ({
//         url: `/products/${id}`,
//         method: 'PUT',
//         body: productData,
//       }),
//       invalidatesTags: ['Product'],  // Invalidate product cache after update
//     }),
//     // Define a mutation for deleting a product
//     deleteProduct: builder.mutation({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Product'],  // Invalidate product cache after deletion
//     }),
//   }),
// });

// // Export hooks for usage in functional components
// export const {
//   useGetProductsQuery,
//   useAddProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } = productsApi;
