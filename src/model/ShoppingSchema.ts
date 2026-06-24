import { z } from "zod";
import { ShoppingStatus } from "./ShoppingStatus";

export const CreateShoppingItemSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  category: z.string().trim().default(""),
  status: z.enum(ShoppingStatus).default(ShoppingStatus.PENDING),
  quantity: z.number().positive("Quantity must be greater than 0"),
  unit: z.string().trim().default(""),
  price: z.number().nonnegative("Price cannot be negative"),
  tags: z.array(z.string().trim().toLowerCase()).nullable(),
});

export const ShoppingItemSchema = CreateShoppingItemSchema.extend(
  z.object({
    // id: z.uuid("Invalid system ID format"),
    id: z.string().trim().min(1, "Invalid system ID format").max(24),
    createdAt: z.iso.datetime("Invalid creation timestamp format"),
    updatedAt: z.iso.datetime("Invalid update timestamp format"),
  }).shape
);

export type CreateShoppingItemDTO = z.infer<typeof CreateShoppingItemSchema>;
export type ShoppingItemDTO = z.infer<typeof ShoppingItemSchema>;
