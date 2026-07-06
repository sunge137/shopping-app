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
import { ShoppingItem } from "@model/ShoppingItem";
import { ShoppingStatus } from "@model/ShoppingStatus";
import { updateShoppingItem } from "@utilities/api";

interface ShoppingListProps {
  initialList: ShoppingItem[];
}

function ShoppingList({
  initialList,
}: Readonly<ShoppingListProps>) {
  const [list, setList] = useState<ShoppingItem[]>(initialList);
  const [isEditingAll, setIsEditingAll] = useState(false);

  const handleToggle = (task: ShoppingItem, index: number, status: boolean) => () => {
    if (isEditingAll) return;
    const previousItems = list.map(item => ShoppingItem.parse(item));
    const newStatus = status ? ShoppingStatus.PENDING : ShoppingStatus.COMPLETED;
    const updatedItem = ShoppingItem.parse({
      ...ShoppingItem.json(task),
      status: newStatus
    });
    const updatedItems = [...list];
    updatedItems[index] = updatedItem;
    setList(updatedItems);
    const payload = ShoppingItem.parse({
      ...ShoppingItem.json(task),
      status: newStatus
    });
    updateShoppingItem(payload, (ok: boolean) => {
      if (!ok) {
        setList(previousItems);
      }
    });
  };

  const handleDelete = (task: ShoppingItem, index: number) => {
    const previousItems = list.map(item => ShoppingItem.parse(item));
    const newStatus = ShoppingStatus.DELETED;
    const updatedItem = ShoppingItem.parse({
      ...ShoppingItem.json(task),
      status: newStatus
    });
    const updatedItems = list.filter((_, i) => i !== index);
    updatedItems[index] = updatedItem;
    setList(updatedItems);
    const payload = ShoppingItem.parse({
      ...ShoppingItem.json(task),
      status: newStatus
    });
    updateShoppingItem(payload, (ok: boolean) => {
      if (!ok) {
        setList(previousItems);
      }
    });
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
                <SwipeableListItem onDelete={() => handleDelete(task, index)} isGlobalEdit={isEditingAll}>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(task, index, isChecked)}
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
