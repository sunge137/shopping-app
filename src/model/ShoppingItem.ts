import { z } from "zod";

export enum ShoppingStatus {
  PENDING = "pending",
  COMPLETED = "completed"
}

export const ShoppingItemZodSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  category: z.string().trim().default(""),
  status: z.enum(ShoppingStatus),
  quantity: z.number().positive(),
  unit: z.string().trim().default(""),
  price: z.number().nonnegative(),
  tags: z.array(z.string()).nullable(),
});

export type TShoppingItem = z.infer<typeof ShoppingItemZodSchema>;

export interface IShoppingItemEntity extends TShoppingItem {
  id: string;
  createdAt: string;
  updatedAt: string;
}
