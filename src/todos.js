import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import produce from "immer";

const todosslice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    add: (state, action) =>
      state.concat({ id: uuidv4(), text: action.text, active: true }),
    remove: (state, action) => state.filter(todo => todo.id !== action.id),
    toggle: (state, action) =>
      produce(state, draftstate => {
        const index = draftstate.findIndex(todo => todo.id === action.id);
        draftstate[index].active = !draftstate[index].active;
      })
      
  }
});

export default todosslice;
