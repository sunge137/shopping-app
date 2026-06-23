import { IShoppingItemEntity, TShoppingItem } from "@model/ShoppingItem";
import { MongoDBShoppingItemRepository } from "./ShoppingRepositoryMongoose";

export interface IShoppingItemRepository {
  create(data: TShoppingItem): Promise<IShoppingItemEntity>;
  readAll(): Promise<IShoppingItemEntity[]>;
  readById(id: string): Promise<IShoppingItemEntity | null>;
  update(id: string, data: Partial<TShoppingItem>): Promise<IShoppingItemEntity | null>;
  delete(id: string): Promise<boolean>;
}

export class ShoppingItemRepository {
  private static instance: IShoppingItemRepository | null = null;

  private constructor() { }

  public static get(): IShoppingItemRepository {
    if (ShoppingItemRepository.instance) {
      return ShoppingItemRepository.instance;
    }
    const dbType = process.env.DATABASE_TYPE;
    switch (dbType?.toLowerCase()) {
      case "mongodb":
        ShoppingItemRepository.instance = new MongoDBShoppingItemRepository();
        break;
      default:
        throw new Error(`Unsupported database configuration: "${dbType}"`);
    }
    return ShoppingItemRepository.instance;
  }
}
