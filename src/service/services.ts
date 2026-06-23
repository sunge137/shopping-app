import { ShoppingRepository } from "@repository/ShoppingRepository";
import { ShoppingService } from "./ShoppingService";

const repositoryInstance = ShoppingRepository.get();

ShoppingService.init(repositoryInstance);

export const shoppingService = ShoppingService.get();
