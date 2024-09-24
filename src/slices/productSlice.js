import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import axios from "axios";

// Thunk to post a product
export let postProduct = createAsyncThunk(
    'products/productsPost',
    async (product, { rejectWithValue }) => {
        try {
            let res = await axios.post(`${import.meta.env.VITE_API_URL}/createProduct`, product);
            return res.data;
        } catch (error) {
            // Log the error
            console.log(error);
            // Use rejectWithValue to pass the error to the rejected action
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// get all products

export let getAllProduct = createAsyncThunk(
    'products/getAll',
    async () => {
        try {
            let res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
            return res.data;
        } catch (error) {
            // Log the error
            console.log(error);
            // Use rejectWithValue to pass the error to the rejected action
            // return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

export  let deleteProduct=createAsyncThunk('delete/product',async (id) => {
    try {
        let res =await axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`)
        return res.data
    } catch (error) {
        console.log(error);
    }
  })

let productSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        isLoading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(postProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;  // Clear previous errors when new request starts
            })
            .addCase(postProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || "Failed to post product";
            })
            .addCase(postProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products.push(action.payload);  // Push the new product to the state
            })
            .addCase(getAllProduct.fulfilled,(state,action)=>{

                state.isLoading=false
                state.error=null
                state.products=action.payload
            })
            .addCase(getAllProduct.pending,(state)=>{

                state.isLoading=true
            })
            .addCase(getAllProduct.rejected,(state,action)=>{

                state.isLoading=false
                state.error=action.error.message
                state.products=[]
            })
            .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.error=null
                state.isLoading=false
                state.products=state.products.filter((id)=> id!==action.payload)
            })
            .addCase(deleteProduct.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(deleteProduct.rejected,(state,action)=>{
                state.error=action.error.message
                state.isLoading=false
            })
            
    }
})

export default productSlice.reducer;
