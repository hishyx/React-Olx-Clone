import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");
const userSlice = createSlice({
  name: "user",
  initialState: savedUser ? JSON.parse(savedUser) : null,
  reducers: {
    setUser(state, action) {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
