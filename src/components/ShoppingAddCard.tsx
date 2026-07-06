"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton"
import ShoppingAddForm from "@components/ShoppingItemForm";
import { ShoppingItem } from "@model/ShoppingItem";

interface ShoppingAddCardProps {
  children: React.ReactNode;
  item: ShoppingItem;
}

export default function ShoppingAddCard({
  children,
  item
}: Readonly<ShoppingAddCardProps>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="cursor-pointer h-full" onClick={() => setOpen(true)}>
        {children}
      </div>
      <Dialog className="z-[500]" open={open} onClose={() => setOpen(false)} disableScrollLock>
        <DialogTitle className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 text-lg text-center font-bold">
          Update Item
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 text-gray-800 dark:text-zinc-400"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="bg-white dark:bg-zinc-800">
          <ShoppingAddForm type="update" item={item} onSubmit={() => { setOpen(false); window.location.reload(); }} />
        </DialogContent>
      </Dialog>
    </>
  )
}
