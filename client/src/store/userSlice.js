import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    log_in(state, action) {
      console.log(action.payload);
      state.name = action.payload.name;
      state.email = action.payload.email;
      console.log(state.name);
    },
    log_out(state, action) {
      state.name = "";
      state.email = "";
    },
  },
});

export const userReducer = userSlice.reducer;
export const { log_in, log_out } = userSlice.actions;
