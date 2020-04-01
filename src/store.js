import { configureStore } from "@reduxjs/toolkit";
import todosslice from "./todos";

const store = configureStore({
  reducer: todosslice.reducer
});
console.log("m");

export default store;
