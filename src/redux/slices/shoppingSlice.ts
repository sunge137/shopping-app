import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingItem } from "@model/ShoppingItem";

// Define a type for the slice state
export interface ShoppingState {
  list: ShoppingItem[]
}

// Define the initial state using that type
const initialState: ShoppingState = {
  list: []
};

export const shoppingSlice = createSlice({
  name: "shopping",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItem>) => {
      state.list.push(JSON.parse(JSON.stringify(action.payload)));
    },
    setItem: (state, action: PayloadAction<ShoppingItem>) => {
      const index = state.list.findIndex(item => item.name === action.payload.name);
      if (index !== -1) {
        state.list[index] = JSON.parse(JSON.stringify(action.payload));
      }
    },
    setList: (state, action: PayloadAction<ShoppingItem[]>) => {
      state.list = action.payload.map(item => JSON.parse(JSON.stringify(item)));
    },
  }
});

export const { addItem, setItem, setList } = shoppingSlice.actions;

export default shoppingSlice.reducer;
