import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'productsState',
    initialState: {
        value: [],
        totalQuantity: 0,
        totalAmount: 0
    },
    reducers: {
        addItem: (state,action) => {
            const product = action.payload;
            const existIndex = state.value.findIndex((x) => x.id === product.id)
            if (existIndex >= 0) {
                state.value[existIndex].qty += 1;
            } else {
                state.value.push({ ...product, qty: 1 });
            }
            console.log(state.value);
            state.totalQuantity += 1;
            state.totalAmount += product.price;
            localStorage.setItem("cartItems", JSON.stringify(state.value));
        },
        delItem: (state,action) => {
            const productId = action.payload;
            const existIndex = state.value.findIndex((x) => x.id === productId);
            const product = state.value.find((x) => x.id === productId)
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
        },
    }
})

export const { addItem, delItem } = productSlice.actions

export default productSlice.reducer