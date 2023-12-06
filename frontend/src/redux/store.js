import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./product/productSlice"
import cartSlice from "./cart/cartSlice"

export const store = configureStore({
    reducer: {
        products: productSlice,
        cartState: cartSlice
    }
})
