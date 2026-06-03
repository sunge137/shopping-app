"use client";

import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton"
import ShoppingAddForm from "@components/ShoppingAddForm";

function ShoppingAddDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        className="text-white hover:bg-slate-800 transition-colors duration-200"
      >
        <AddIcon />
      </IconButton>
      <Dialog className="z-[500]" open={open} onClose={() => setOpen(false)} disableScrollLock>
        <DialogTitle className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 text-lg text-center font-bold">
          Add New Item
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 text-gray-800 dark:text-zinc-400"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent className="bg-white dark:bg-zinc-800">
          <ShoppingAddForm onSubmit={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ShoppingAddDialog;
