import { createSlice } from "@reduxjs/toolkit";

// Initialize state from localStorage
const initializeAuthState = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    try {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
      };
    } catch (error) {
      // If parsing fails, clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }

  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initializeAuthState(),
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
