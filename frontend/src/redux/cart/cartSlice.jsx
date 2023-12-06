import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cartState',
    initialState: {
        value: false,
    },
    reducers: {
        openCartBar(state, action) {
            state.value = action.payload
        },
    },
});

export const { openCartBar } = cartSlice.actions;
export default cartSlice.reducer;