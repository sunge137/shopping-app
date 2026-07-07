"use client";

import { Fragment as ReactFragment, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SwipeableListItem from "@components/SwipeableListItem";
import { ShoppingItem, ShoppingItemData } from "@model/ShoppingItem";
import { ShoppingStatus } from "@model/ShoppingStatus";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { setItem } from "@redux/slices/shoppingSlice";
import { updateShoppingItem } from "@utilities/api";

function ShoppingList() {
  const dispatch = useAppDispatch();
  const { list } = useAppSelector(state => state.shopping);
  const [isEditingAll, setIsEditingAll] = useState(false);

  const isTempItem = (id: string) => id.startsWith("temp-");

  const handleToggle = async (task: ShoppingItemData, status: boolean) => {
    if (isEditingAll || isTempItem(task.id)) return;
    const newStatus = status ? ShoppingStatus.PENDING : ShoppingStatus.COMPLETED;
    const updatedItem = ShoppingItem.json(ShoppingItem.parse({
      ...task,
      status: newStatus
    }));
    dispatch(setItem(updatedItem));

    try {
      const response = await updateShoppingItem(updatedItem);
      dispatch(setItem(ShoppingItem.json(ShoppingItem.parse(response))));
    } catch (error) {
      dispatch(setItem(task));
      console.error("Failed to toggle shopping item status:", error);
    }
  };

  const handleDelete = async (task: ShoppingItemData) => {
    if (isTempItem(task.id)) return;
    const newStatus = ShoppingStatus.DELETED;
    const updatedItem = ShoppingItem.json(ShoppingItem.parse({
      ...task,
      status: newStatus
    }));
    dispatch(setItem(updatedItem));
    try {
      await updateShoppingItem(updatedItem);
    } catch (error) {
      dispatch(setItem(task));
      console.error("Failed to delete shopping item:", error);
    }
  };

  return (
    <div className="w-full bg-inherit text-black dark:text-white rounded-lg shadow p-2">
      <div className="flex justify-end w-full px-1">
        <button
          onClick={() => setIsEditingAll(!isEditingAll)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-all select-none border ${isEditingAll
            ? "bg-neutral-200 border-neutral-300 dark:bg-zinc-700 dark:border-zinc-600 text-neutral-800 dark:text-white"
            : "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/60"
            }`}
        >
          {isEditingAll ? "Done" : "Edit List"}
        </button>
      </div>
      <List disablePadding>
        {list.map((task, index) => {
          const isChecked = task.status === ShoppingStatus.COMPLETED;
          return (
            <ReactFragment key={index}>
              <ListItem disablePadding>
                <SwipeableListItem onDelete={() => handleDelete(task)} isGlobalEdit={isEditingAll}>
                  <ListItemButton
                    role={undefined}
                    onClick={() => handleToggle(task, isChecked)}
                    dense
                    disabled={isEditingAll}
                    className="hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
                  >
                    <ListItemIcon className="min-w-0 mr-3">
                      <Checkbox
                        edge="start"
                        checked={isChecked}
                        tabIndex={-1}
                        disableRipple
                        icon={<RadioButtonUncheckedIcon className="text-neutral-400 dark:text-white" />}
                        checkedIcon={<CheckCircleIcon className="text-blue-800 dark:text-white" />}
                        className="p-0"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={task.name}
                      className={`m-0 ${isChecked ? "line-through opacity-60" : ""}`}
                    />
                  </ListItemButton>
                </SwipeableListItem>
              </ListItem>
              {index < list.length - 1 && (
                <hr className="border-t border-current opacity-10 my-1 list-none" />
              )}
            </ReactFragment>
          );
        })}
      </List>
    </div>
  );
}

export default ShoppingList;
