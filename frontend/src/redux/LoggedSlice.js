import { createSlice } from "@reduxjs/toolkit";

const loggedSlice = createSlice({
  name: "logged",
  initialState: {
    isLogged: false,
    isSigned: false,
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
  },
});
export const { login, logout, isSignin } = loggedSlice.actions;
export default loggedSlice.reducer;
