import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@redux/store";
import { IShoppingItemEntity } from "@model/ShoppingItem";

// Define a type for the slice state
export interface ShoppingState {
  list: IShoppingItemEntity[]
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
    addItem: (state, action: PayloadAction<IShoppingItemEntity>) => {
      state.list.push(action.payload);
    },
    setList: (state, action: PayloadAction<IShoppingItemEntity[]>) => {
      return {
        ...state,
        list: action.payload
      };
    },
    updateTodo: (state, action: PayloadAction<IShoppingItemEntity>) => {
      const index = state.list.findIndex(item => item.name === action.payload.name);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    }
  }
});

export const { addItem, setList } = shoppingSlice.actions;

export default shoppingSlice.reducer;
