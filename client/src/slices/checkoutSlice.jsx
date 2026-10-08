import { createSlice } from "@reduxjs/toolkit";

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: { status: "idle", error: null },
  reducers: {
    checkoutStarted(state) { state.status = "loading"; state.error = null; },
    checkoutSucceeded(state) { state.status = "success"; },
    checkoutFailed(state, action) { state.status = "failed"; state.error = action.payload; },
    resetCheckout(state) { state.status = "idle"; state.error = null; },
  },
});

export const { checkoutStarted, checkoutSucceeded, checkoutFailed, resetCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer;
