import { z } from "zod";

export enum ShoppingStatus {
  PENDING = "pending",
  COMPLETED = "completed"
}

export interface IShoppingItem {
  name: string;
  category?: string;
  status?: ShoppingStatus;
  quantity?: number;
  unit?: string;
  price?: number;
  tags?: string[] | null;
}

export class ShoppingItem implements IShoppingItem {
  name: string;
  category: string;
  status: ShoppingStatus;
  quantity: number;
  unit: string;
  price: number;
  tags: string[] | null;

  constructor({
    name,
    category = "",
    status = ShoppingStatus.PENDING,
    quantity = 0,
    unit = "ea",
    price = 0,
    tags = null
  }: IShoppingItem
    // name: string,
    // category: string = "",
    // status: ShoppingStatus = ShoppingStatus.PENDING,
    // quantity: number = 0,
    // unit: string = "ea",
    // price: number = 0,
    // tags: string[] | null = null
  ) {
    this.name = name;
    this.category = category;
    this.status = status;
    this.quantity = quantity;
    this.unit = unit;
    this.price = price;
    this.tags = tags;
  }

}

export const ShoppingItemSchema = z.object({
  name: z.string(),
  category: z.string(),
  status: z.enum(ShoppingStatus),
  quantity: z.number(),
  unit: z.string(),
  price: z.number(),
  tags: z.array(z.string()).nullable(),
});
