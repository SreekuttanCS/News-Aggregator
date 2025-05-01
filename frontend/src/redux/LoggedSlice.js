import { createSlice } from "@reduxjs/toolkit";

const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    isLogged: false,
    isSigned: false,
    isPost: false,
  },
  reducers: {
    login: (state) => {
      state.isLogged = true;
    },
    logout: (state) => {
      state.isLogged = false;
    },
    isSignin: (state, action) => {
      state.isSigned = action.payload;
    },
    isPost: (action, state) => {
      state.isPost = action.payload;
    },
  },
});
export const { login, logout, isSignin, isPost } = loggedSlice.actions;
export default loggedSlice.reducer;
