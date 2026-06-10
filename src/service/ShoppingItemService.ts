import { TShoppingItem } from "@model/ShoppingItem";
import { IShoppingItemRepository } from "@repository/ShoppingItemRepository";

export class ShoppingItemService {
  private static instance: ShoppingItemService | null = null;

  private constructor(private repository: IShoppingItemRepository) { }

  public static init(repository: IShoppingItemRepository): ShoppingItemService {
    if (!ShoppingItemService.instance) {
      ShoppingItemService.instance = new ShoppingItemService(repository);
    }
    return ShoppingItemService.instance;
  }

  public static get(): ShoppingItemService {
    if (!ShoppingItemService.instance) {
      throw new Error("ShoppingItemService must be initialized with a repository first.");
    }
    return ShoppingItemService.instance;
  }

  async addShoppingItem(data: TShoppingItem) {
    return await this.repository.create(data);
  }

  async getShoppingItems() {
    return await this.repository.readAll();
  }

  async getShoppingItem(id: string) {
    const item = await this.repository.readById(id);
    if (!item) {
      throw new Error("Shopping item not found");
    }
    return item;
  }

  async setShoppingItem(id: string, data: Partial<TShoppingItem>) {
    return await this.repository.update(id, data);
  }

  async removeShoppingItem(id: string) {
    const isDeleted = await this.repository.delete(id);
    if (!isDeleted) {
      throw new Error("Shopping item not found or already deleted");
    }
    return isDeleted;
  }
}
