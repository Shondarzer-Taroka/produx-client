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
            
    }
})

export default productSlice.reducer;
