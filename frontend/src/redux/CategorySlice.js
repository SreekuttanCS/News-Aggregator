import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: "All",
  },
  reducers: {
    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
