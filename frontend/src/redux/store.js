import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./NewsSlice.js";

const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});

export default store;
