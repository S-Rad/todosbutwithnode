import { configureStore } from "@reduxjs/toolkit";
import todosslice from "todos.js";
const store = configureStore({
  reducer: todosslice.reducer
});

export default store;
