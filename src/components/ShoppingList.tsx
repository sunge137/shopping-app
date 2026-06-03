"use client";

import { Fragment as ReactFragment, useEffect, useMemo, useState } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ShoppingItem, ShoppingStatus } from "@service/entities/ShoppingItem";
import { updateShoppingItem } from "@service/shopping-service";

// interface Task {
//   id: number;
//   text: string;
// }

// const initialTasks: Task[] = [
//   { id: 1, text: "Review project requirements" },
//   { id: 2, text: "Setup Next.js environment" },
//   { id: 3, text: "Integrate Material UI with Tailwind" },
//   { id: 4, text: "Implement circular checkboxes" },
// ];

function ShoppingList({
  initialList,
}: Readonly<{
  initialList: ShoppingItem[];
}>) {
  const [list, setList] = useState<ShoppingItem[]>(initialList);
  //const [checked, setChecked] = useState<number[]>([]);

  const handleToggle = (task: ShoppingItem, status: boolean) => () => {
    console.log("toggle", task.name)
    const previousItems = JSON.parse(JSON.stringify(list));
    const updatedItems = list.map(item =>
      item.name === task.name ? { ...item, status: status ? ShoppingStatus.PENDING : ShoppingStatus.COMPLETED } : item
    );
    setList(updatedItems);
    updateShoppingItem(Object.assign(task, { status: status ? ShoppingStatus.PENDING : ShoppingStatus.COMPLETED }), (ok: boolean) => {
      if (!ok) {
        setList(previousItems);
      }
    });

    // const currentIndex = checked.indexOf(taskId);
    // const newChecked = [...checked];

    // if (currentIndex === -1) {
    //   newChecked.push(taskId);
    // } else {
    //   newChecked.splice(currentIndex, 1);
    // }

    // setChecked(newChecked);
  };

  return (
    <div className="w-full max-w-md bg-inherit text-black dark:text-white rounded-lg shadow p-2">
      <List disablePadding>
        {list.map((task, index) => {
          // const isChecked = checked.indexOf(task.id) !== -1;
          const isChecked = task.status === ShoppingStatus.COMPLETED;
          return (
            <ReactFragment key={index}>
              <ListItem disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(task, isChecked)}
                  dense
                  className="hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
                >
                  <ListItemIcon className="min-w-0 mr-3">
                    <Checkbox
                      edge="start"
                      checked={isChecked}
                      tabIndex={-1}
                      disableRipple
                      // Uses text-neutral-400 for light mode, switches to text-white in dark mode
                      icon={<RadioButtonUncheckedIcon className="text-neutral-400 dark:text-white" />}
                      // Uses primary brand color for light mode, switches to text-white in dark mode
                      checkedIcon={<CheckCircleIcon className="text-blue-800 dark:text-white" />}
                      className="p-0"
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={task.name}
                    className={`m-0 ${isChecked ? "line-through opacity-60" : ""}`}
                  />
                </ListItemButton>
              </ListItem>
              {index < List.length - 1 && <Divider component="li" className="bg-current opacity-10" />}
            </ReactFragment>
          );
        })}
      </List>
    </div>
  );
}

export default ShoppingList;
