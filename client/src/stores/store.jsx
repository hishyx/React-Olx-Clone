import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.jsx";
import cartReducer from "../slices/cartSlice.jsx";
import productReducer from "../slices/productSlice.jsx";
import checkoutReducer from "../slices/checkoutSlice.jsx";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    products: productReducer,
    checkout: checkoutReducer,
  },
});

export default store;
