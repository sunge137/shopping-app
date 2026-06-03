import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@redux/slices/counterSlice";
import shoppingReducer from "@redux/slices/shoppingSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      shopping: shoppingReducer,
    }
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
