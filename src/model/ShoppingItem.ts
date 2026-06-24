import { CreateShoppingItemDTO, CreateShoppingItemSchema, ShoppingItemSchema, type ShoppingItemDTO } from "./ShoppingSchema";
import { ShoppingStatus } from "./ShoppingStatus";

export type ShoppingItemFormData = CreateShoppingItemDTO;

export class ShoppingItem implements ShoppingItemDTO {
  public id!: string;
  public createdAt!: string;
  public updatedAt!: string;
  public name!: string;
  public category!: string;
  public status!: ShoppingStatus;
  public quantity!: number;
  public unit!: string;
  public price!: number;
  public tags!: string[] | null;

  private constructor(data: ShoppingItemDTO) {
    Object.assign(this, data);
  }

  public static form(data: unknown): ShoppingItemFormData {
    const validatedForm = CreateShoppingItemSchema.parse(data);
    return validatedForm;
  }

  public static parse(data: unknown): ShoppingItem {
    const validatedData = ShoppingItemSchema.parse(data);
    return new ShoppingItem(validatedData);
  }

  public static validate(data: unknown): boolean {
    const safeResult = ShoppingItemSchema.safeParse(data);
    return safeResult.success;
  }

  public static json(data: ShoppingItem): Object {
    return {
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      name: data.name,
      category: data.category,
      status: data.status,
      quantity: data.quantity,
      unit: data.unit,
      price: data.price,
      tags: data.tags
    };
  }
}
