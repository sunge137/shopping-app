"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import ChecklistIcon from "@mui/icons-material/Checklist";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import IconButton from "@mui/material/IconButton";
import ShoppingItemForm from "@components/ShoppingItemForm";

function ShoppingFooter() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { icon: <ChecklistIcon />, path: "/shopping/list" },
    { icon: <ImageSearchIcon />, path: "/shopping/search" },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white shadow-lg border-t border-slate-700 py-3 z-50">
      <div className="grid grid-cols-3 max-w-lg mx-auto px-6">
        {navItems.map((item, index) => (
          <div key={index} className="flex justify-center">
            <IconButton
              onClick={() => router.push(item.path)}
              className="text-white hover:bg-slate-800 transition-colors duration-200"
            >
              {item.icon}
            </IconButton>
          </div>
        ))}
        <div className="flex justify-center">
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
              <ShoppingItemForm onSubmit={() => { setOpen(false); window.location.reload(); }} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;
