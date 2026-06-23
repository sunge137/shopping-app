import { ShoppingItemRepository } from "@repository/ShoppingRepository";
import { ShoppingItemService } from "./ShoppingService";

const repositoryInstance = ShoppingItemRepository.get();

ShoppingItemService.init(repositoryInstance);

export const shoppingService = ShoppingItemService.get();
