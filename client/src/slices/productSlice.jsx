import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api.js";

export const fetchProducts = createAsyncThunk("products/fetch", async (filters = {}) => {
  const params = {};
  if (filters.category && filters.category !== "All") params.category = filters.category;
  if (filters.maxPrice) params.maxPrice = filters.maxPrice;
  const response = await api.get("/products", { params });
  return response.data;
});

export const fetchMyProducts = createAsyncThunk("products/fetchMine", async () => {
  const response = await api.get("/products/mine");
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; })
      .addCase(fetchMyProducts.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMyProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchMyProducts.rejected, (state, action) => { state.loading = false; state.error = action.error.message; });
  },
});

export default productSlice.reducer;
