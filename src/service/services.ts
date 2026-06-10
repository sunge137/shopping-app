import { ShoppingItemRepository } from "@repository/ShoppingItemRepository";
import { ShoppingItemService } from "./ShoppingItemService";

const repositoryInstance = ShoppingItemRepository.get();

ShoppingItemService.init(repositoryInstance);

export const shoppingService = ShoppingItemService.get();
