import { createSlice } from '@reduxjs/toolkit'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        value: []
    },
    reducers: {
        addItem: (state,action) => {
            const product = action.payload;
            const existIndex = state.value.findIndex((x) => x.id === product.id);
            if (existIndex !== -1) {
                state.value[existIndex].qty += 1;
            } else {
                state.value.push({ ...product, qty: 1 });
            }
        },
        delItem: (state,action) => {
            const productId = action.payload;
            const existIndex = state.value.findIndex((x) => x.id === productId);

            if (existIndex !== -1) {
                if (state.value[existIndex].qty === 1) {
                    state.value.splice(existIndex, 1);
                } else {
                    state.value[existIndex].qty -= 1;
                }
            }
        },
    }
})

export const { addItem, delItem } = productSlice.actions

export default productSlice.reducer