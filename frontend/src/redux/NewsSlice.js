import { createSlice } from "@reduxjs/toolkit";

const newSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    error: null,
  },
  reducers: {
    newsLoading(state) {
      state.loading = true;
    },
    newsLoaded(state, action) {
      state.news = action.payload;
      state.loading = true;
    },
    newsError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});
export const { newsLoading, newsLoaded, newsError } = newSlice.actions;

export default newSlice.reducer;
