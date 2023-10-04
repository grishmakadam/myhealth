import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],quantity: 0, total: 0 
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    initialise_cart(state, action) {
          state.items = action.payload;
          state.quantity=action.payload.reduce(
            (sum, current) => sum + current.quantity,
            0
          );
          state.total = action.payload.reduce(
            (sum, current) => sum + current.quantity * current.price,
            0
          );
    },
    clear_cart(state, action) {
        state.items = [];
        state.quantity = 0
        state.total=0
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {initialise_cart,clear_cart } = cartSlice.actions;
