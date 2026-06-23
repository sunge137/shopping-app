import { IShoppingItemEntity, TShoppingItem } from "@model/ShoppingItem";
import { MongoDBShoppingRepository } from "./ShoppingRepositoryMongoose";

export interface IShoppingRepository {
  create(data: TShoppingItem): Promise<IShoppingItemEntity>;
  readAll(): Promise<IShoppingItemEntity[]>;
  readById(id: string): Promise<IShoppingItemEntity | null>;
  update(id: string, data: Partial<TShoppingItem>): Promise<IShoppingItemEntity | null>;
  delete(id: string): Promise<boolean>;
}

export class ShoppingRepository {
  private static instance: IShoppingRepository | null = null;

  private constructor() { }

  public static get(): IShoppingRepository {
    if (ShoppingRepository.instance) {
      return ShoppingRepository.instance;
    }
    const dbType = process.env.DATABASE_TYPE;
    switch (dbType?.toLowerCase()) {
      case "mongodb":
        ShoppingRepository.instance = new MongoDBShoppingRepository();
        break;
      default:
        throw new Error(`Unsupported database configuration: "${dbType}"`);
    }
    return ShoppingRepository.instance;
  }
}
