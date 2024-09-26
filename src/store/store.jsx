import { configureStore } from "@reduxjs/toolkit"
import  productReducer from  "../slices/productSlice"
import productsApi from "../RTK/slices/productApiSlice"
import { setupListeners } from "@reduxjs/toolkit/query";

let store=configureStore({
    reducer:{
        products: productReducer,
        [productsApi.reducerPath]:productsApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(productsApi.middleware),
});
setupListeners(store.dispatch)
export default store