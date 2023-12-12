import { createSlice } from '@reduxjs/toolkit'


const items = localStorage.getItem("cartItems") !== null ? JSON.parse(localStorage.getItem("cartItems")) : []
const totalQuantity = localStorage.getItem("totalQuantity") !== null ? JSON.parse(localStorage.getItem("totalQuantity")) : 0
const totalAmount = localStorage.getItem("totalAmount") !== null ? JSON.parse(localStorage.getItem("totalAmount")) : 0

export const productSlice = createSlice({
    name: 'productsState',
    initialState: {
        value: items,
        totalQuantity: totalQuantity,
        totalAmount: totalAmount
    },
    reducers: {
        addItem: (state,action) => {
            const product = action.payload;
            console.log(product);
            console.log(state.value);
            const existIndex = state.value.findIndex((x) => x._id === product._id)
            console.log(existIndex);
            if (existIndex >= 0) {
                state.value[existIndex].qty += 1;
            } else {
                state.value.push({ ...product, qty: 1 });
            }
            console.log(state.value);
            state.totalQuantity += 1;
            state.totalAmount += product.price;
            localStorage.setItem("cartItems", JSON.stringify(state.value));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        },
        delItem: (state,action) => {
            const productId = action.payload;
            const existIndex = state.value.findIndex((x) => x._id === productId);
            const product = state.value.find((x) => x._id === productId)
            if (existIndex >= 0) {
                if (state.value[existIndex].qty === 1) {
                    state.value.splice(existIndex, 1);
                } else {
                    state.value[existIndex].qty -= 1;
                }
            }
            state.totalQuantity -= 1;
            state.totalAmount -= product.price;
            localStorage.setItem("cartItems", JSON.stringify(state.value));
            localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
        },
    }
})

export const { addItem, delItem } = productSlice.actions

export default productSlice.reducer