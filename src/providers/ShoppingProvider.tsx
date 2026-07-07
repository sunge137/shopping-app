"use client";

import { useCallback, useEffect, useRef } from "react";
import { ShoppingItem, ShoppingItemData } from "@model/ShoppingItem";
import { useAppDispatch } from "@redux/hooks";
import { setList } from "@redux/slices/shoppingSlice";
import { getShoppingItems } from "@utilities/api";

const SYNC_INTERVAL_MS = Number(process.env.NEXT_PUBLIC_SHOPPING_SYNC_INTERVAL) || 30_000;

function ShoppingProvider({
  children,
  initialList,
}: {
  children: React.ReactNode;
  initialList: ShoppingItemData[];
}) {
  const dispatch = useAppDispatch();
  const isInitial = useRef(false);

  const refreshShoppingItems = useCallback(async () => {
    try {
      const latestItems = await getShoppingItems();
      dispatch(setList(latestItems.map(item => ShoppingItem.json(item))));
    } catch (error) {
      console.error("Shopping list background sync failed:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isInitial.current) {
      dispatch(setList(initialList.map(item => ShoppingItem.json(item))));
      isInitial.current = true;
    }
  }, [dispatch, initialList]);

  useEffect(() => {
    refreshShoppingItems();

    const timer = window.setInterval(refreshShoppingItems, SYNC_INTERVAL_MS);
    window.addEventListener("focus", refreshShoppingItems);
    window.addEventListener("shopping:refresh", refreshShoppingItems);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", refreshShoppingItems);
      window.removeEventListener("shopping:refresh", refreshShoppingItems);
    };
  }, [refreshShoppingItems]);

  return <>{children}</>;
}

export default ShoppingProvider;
