"use client";

import Button from "@mui/material/Button";
import { decrement, increment } from "@redux/slices/counterSlice";
import { useAppSelector, useAppDispatch } from "@redux/hooks";

function Counter() {
  const count = useAppSelector(state => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="mx-auto p-8">
      <div className="flex justify-center items-center gap-4">
        <Button className="bg-blue-500 text-white dark:bg-red-600" aria-label="Increment value" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <span>{count}</span>
        <Button className="bg-blue-500 text-white dark:bg-red-600" aria-label="Decrement value" onClick={() => dispatch(decrement())}>
          Decrement
        </Button>
      </div>
    </div>
  );
}

export default Counter;
