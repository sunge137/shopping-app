"use client";

import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton"
import ShoppingItemForm from "@components/ShoppingItemForm";
import { useAppSelector } from "@redux/hooks";

function ShoppingCatelog() {
  const [openIndex, setOpenIndex] = useState(-1);
  const { list } = useAppSelector(state => state.shopping);

  return (
    <div className="w-full p-6 bg-white dark:bg-zinc-950 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-[repeat(auto-fill,240px)] gap-4 max-w-full mx-auto" style={{ justifyContent: "start" }}>
        {list.map((item, index) => (
          <div
            key={index + item.name}
            className="w-[240px] h-[240px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col justify-between items-stretch transition-all duration-200 ease-in-out hover:bg-zinc-50 dark:hover:bg-zinc-800/50 active:scale-[0.99]"
          >
            <div className="cursor-pointer h-full" onClick={() => setOpenIndex(index)}>
              <div className="p-4 flex-1 flex flex-col justify-start overflow-hidden">
                <h3 className="line-clamp-2 text-sm font-medium leading-snug break-words text-zinc-900 dark:text-zinc-50">
                  {item.name}
                </h3>
              </div>
              <div className="p-4 pt-0 shrink-0">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-200">
                  {item.price}
                </p>
              </div>
            </div>
            <Dialog className="z-[500]" open={openIndex === index} onClose={() => setOpenIndex(-1)} disableScrollLock>
              <DialogTitle className="bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 text-lg text-center font-bold">
                Update Item
                <IconButton
                  aria-label="close"
                  onClick={() => setOpenIndex(-1)}
                  className="absolute right-2 top-2 text-gray-800 dark:text-zinc-400"
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent className="bg-white dark:bg-zinc-800">
                <ShoppingItemForm type="update" item={item} onSubmit={() => { setOpenIndex(-1); }} />
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingCatelog;
