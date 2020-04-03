import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import todosslice from "./todos";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage
  },
  combineReducers({ todos: todosslice.reducer })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: []
});

persistStore(store);

export default store;
