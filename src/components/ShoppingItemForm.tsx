"use client";

import { useState, KeyboardEvent, SubmitEvent } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField"
import Loader from "@components/Loader";
import { ShoppingItem, ShoppingItemData } from "@model/ShoppingItem";
import { ShoppingStatus } from "@model/ShoppingStatus";
import { createShoppingItem, updateShoppingItem } from "@utilities/api";

// Consistent Tailwind class composition for styling both Light and Dark mode variations
const muiTailwindStyles =
  // Light Mode States
  "[&_.MuiOutlinedInput-notchedOutline]:border-gray-300 " +
  "[&_hover_.MuiOutlinedInput-notchedOutline]:border-gray-400 " +
  "[&_.Mui-focused_.MuiOutlinedInput-notchedOutline]:border-gray-800 " +
  "[&_.MuiInputLabel-root.Mui-focused]:text-gray-800 " +
  "[&_.MuiInputLabel-root]:text-gray-500 " +
  "[&_.MuiOutlinedInput-root]:text-gray-800 " +
  "[&_.MuiChip-deleteIcon]:text-gray-500 " +
  "hover:[&_.MuiChip-deleteIcon]:text-blue-800 " +
  // Dark Mode States
  "dark:[&_.MuiOutlinedInput-notchedOutline]:border-gray-700 " +
  "dark:[&_hover_.MuiOutlinedInput-notchedOutline]:border-gray-500 " +
  "dark:[&_.Mui-focused_.MuiOutlinedInput-notchedOutline]:border-gray-200 " +
  "dark:[&_.MuiInputLabel-root.Mui-focused]:text-gray-200 " +
  "dark:[&_.MuiInputLabel-root]:text-gray-400 " +
  "dark:[&_.MuiOutlinedInput-root]:text-gray-200 " +
  "dark:[&_.MuiChip-deleteIcon]:text-zinc-400 " +
  "dark:hover:[&_.MuiChip-deleteIcon]:text-blue-400";

interface ShoppingItemFormProps {
  type?: string;
  item?: ShoppingItemData;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

function ShoppingItemForm({
  type,
  item,
  onSubmit
}: Readonly<ShoppingItemFormProps>) {
  const [tags, setTags] = useState<string[]>(item?.tags || []);
  const [tagInput, setTagInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();

      const trimmedValue = tagInput.trim().replace(/^#/, "");

      if (trimmedValue && !tags.includes(trimmedValue)) {
        setTags([...tags, trimmedValue]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.currentTarget);
    const data = {
      name: String(formData.get("name")),
      category: String(formData.get("category")),
      status: ShoppingStatus.PENDING,
      quantity: Number(formData.get("quantity")),
      price: Number(formData.get("price")),
      unit: String(formData.get("unit")),
      tags: tags,
    };
    switch (type) {
      case "update":
        if (item !== null && item !== undefined) {
          let status = item.status;
          if (status == ShoppingStatus.DELETED) {
            status = ShoppingStatus.PENDING;
          }
          const payload = ShoppingItem.json(ShoppingItem.parse({
            ...item,
            ...data,
            name: item.name,
            status: status
          }));
          await updateShoppingItem(payload);
        }
        break;
      default:
        await createShoppingItem(data);
        break;
    }
    setIsLoading(false);
    onSubmit(event);
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 dark:bg-gray-800 p-4 transition-colors duration-200 rounded-lg">
      {isLoading && (
        <Loader />
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white dark:bg-zinc-800 rounded-xl shadow-md dark:shadow-2xl p-6 flex flex-col gap-6 border dark:border-zinc-700 transition-colors duration-200"
      >
        <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1">
            <TextField
              disabled={type == "update"}
              label="Name"
              name="name"
              variant="outlined"
              defaultValue={item?.name || ""}
              fullWidth
              required
              className={muiTailwindStyles}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Category"
              name="category"
              variant="outlined"
              defaultValue={item?.category || ""}
              fullWidth
              className={muiTailwindStyles}
            />
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-4">
          <div className="flex-1">
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              variant="outlined"
              defaultValue={item?.quantity || 1}
              fullWidth
              required
              className={muiTailwindStyles}
              slotProps={{ htmlInput: { min: "0", step: "any" } }}
            />
          </div>
          <div className="flex-1">
            <TextField
              label="Price"
              name="price"
              type="number"
              variant="outlined"
              fullWidth
              defaultValue={item?.price || 0}
              required
              className={muiTailwindStyles}
              slotProps={{
                htmlInput: { min: "0", step: "0.01" },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <span className="text-gray-500 dark:text-zinc-400">$</span>
                    </InputAdornment>
                  )
                }
              }}
            />
          </div>
          <div className="w-full sm:w-1/4 sm:min-w-[90px]">
            <TextField
              label="Unit"
              name="unit"
              variant="outlined"
              fullWidth
              defaultValue={item?.unit || "ea"}
              className={muiTailwindStyles}
            />
          </div>
        </div>
        <div className="w-full">
          <TextField
            label="Tags"
            variant="outlined"
            fullWidth
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={tags.length === 0 ? "Press Enter or Comma to add tags" : ""}
            className={muiTailwindStyles}
            slotProps={{
              input: {
                startAdornment: tags.length > 0 ? (
                  <div className="flex flex-row flex-wrap gap-1.5 w-full mr-2 my-1">
                    {tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={`#${tag}`}
                        onDelete={() => handleRemoveTag(tag)}
                        variant="outlined"
                        size="small"
                        className={"font-medium text-gray-800 border-gray-800 dark:text-zinc-200 dark:border-zinc-600 transition-colors duration-150 hover:text-blue-800 hover:border-blue-800 dark:hover:text-blue-400 dark:hover:border-blue-400" + muiTailwindStyles}
                      />
                    ))}
                  </div>
                ) : null
              }
            }}
          />
        </div>
        <div className="mt-2 flex justify-center w-full">
          <Button
            type="submit"
            variant="contained"
            size="large"
            className="w-full sm:w-auto sm:px-8 bg-gray-800 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-blue-800 dark:hover:bg-blue-600 capitalize text-base py-2.5 transition-colors duration-200"
          >
            Submit Item
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ShoppingItemForm;
