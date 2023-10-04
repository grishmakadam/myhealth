import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
      initialise_orders(state, action) {
      state.items = action.payload
    },
    clear_orders(state, action) {
      state.items = [];
    },
  },
});

export const ordersReducer = ordersSlice.reducer;
export const { initialise_orders, clear_orders } = ordersSlice.actions;
