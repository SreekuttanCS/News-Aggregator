import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./NewsSlice.js";
import loggedReducer from "./LoggedSlice.js";
import categoryReducer from "./CategorySlice.js";

const store = configureStore({
  reducer: {
    news: newsReducer,
    logged: loggedReducer,
    category: categoryReducer,
  },
});

export default store;
