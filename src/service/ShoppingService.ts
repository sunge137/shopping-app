import { ShoppingItemFormData } from "@model/ShoppingItem";
import { IShoppingRepository } from "@repository/ShoppingRepository";

export class ShoppingService {
  private static instance: ShoppingService | null = null;

  private constructor(private repository: IShoppingRepository) { }

  public static init(repository: IShoppingRepository): ShoppingService {
    if (!ShoppingService.instance) {
      ShoppingService.instance = new ShoppingService(repository);
    }
    return ShoppingService.instance;
  }

  public static get(): ShoppingService {
    if (!ShoppingService.instance) {
      throw new Error("ShoppingService must be initialized with a repository first.");
    }
    return ShoppingService.instance;
  }

  async addShoppingItem(data: ShoppingItemFormData) {
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

  async setShoppingItem(id: string, data: Partial<ShoppingItemFormData>) {
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
