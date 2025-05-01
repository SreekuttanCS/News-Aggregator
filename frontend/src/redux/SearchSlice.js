import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchTerm: "",
    searchNews: [],
    isSearch: false,
  },
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
      state.isSearch = true;
    },
    clearSearch(state) {
      (state.searchTerm = ""), (state.isSearch = false);
    },
    addSearchNews(state, action) {
      state.searchNews = action.payload;
    },
  },
});
export const { setSearchTerm, clearSearch, addSearchNews } =
  searchSlice.actions;
export default searchSlice.reducer;
