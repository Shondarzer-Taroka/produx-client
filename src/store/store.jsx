import { configureStore } from "@reduxjs/toolkit"
import  productReducer from  "../slices/productSlice"

let store=configureStore({
    reducer:{
        products: productReducer
    }
})

export default store