import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload.map((item) => ({ ...item, quantity: 1 }));
    },
    addToCart(state, action) {
      if (!state.some((item) => item._id === action.payload._id)) {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    updateQuantity(state, action) {
      const item = state.find((product) => product._id === action.payload.id);
      if (item) item.quantity = Math.max(1, item.quantity + action.payload.change);
    },
    removeFromCart(state, action) {
      return state.filter((item) => item._id !== action.payload);
    },
    clearCart() {
      return [];
    },
  },
});

export const { setCart, addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
