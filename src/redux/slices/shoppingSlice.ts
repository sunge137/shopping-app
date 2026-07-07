import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingItemData } from "@model/ShoppingItem";

export interface ShoppingState {
  list: ShoppingItemData[];
}

const initialState: ShoppingState = {
  list: []
};

export const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ShoppingItemData>) => {
      state.list.push(action.payload);
    },
    setItem: (state, action: PayloadAction<ShoppingItemData>) => {
      const index = state.list.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      } else {
        state.list.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
    setList: (state, action: PayloadAction<ShoppingItemData[]>) => {
      state.list = action.payload;
    },
  }
});

export const { addItem, removeItem, setItem, setList } = shoppingSlice.actions;

export default shoppingSlice.reducer;
