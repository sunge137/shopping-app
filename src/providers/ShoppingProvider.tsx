"use client";

import { ShoppingItem, ShoppingItemData } from "@model/ShoppingItem";
import { useAppDispatch } from "@redux/hooks";
import { setList } from "@redux/slices/shoppingSlice";
import { useRef } from "react";

function ShoppingProvider({
  children,
  initialList,
}: {
  children: React.ReactNode;
  initialList: ShoppingItemData[];
}) {
  const isInitial = useRef(false);
  const dispatch = useAppDispatch();

  if (!isInitial.current) {
    dispatch(setList(initialList.map(item => ShoppingItem.json(item))));
    isInitial.current = true;
  }

  return (
    <>
      {children}
    </>
  );
}

export default ShoppingProvider;
