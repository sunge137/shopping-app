import ShoppingList from "@components/ShoppingList";
import { ShoppingItem } from "@service/entities/ShoppingItem";
import { readShoppingItems } from "@service/shopping-service";

export default async function ShoppingListPage() {
  const list: ShoppingItem[] = await readShoppingItems();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="p-4">
          <h1 className="text-zinc-950 dark:text-zinc-50 text-2xl font-bold mb-4">Your Shopping List</h1>
          <p className="text-gray-600">This is where your shopping list will be displayed.</p>
          <ShoppingList initialList={list} />
        </div>
      </main>
    </div>
  );
}
