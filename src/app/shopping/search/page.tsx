import ShoppingCatelog from "@components/ShoppingCatelog";
import { ShoppingItem } from "@model/ShoppingItem";
import { getShoppingItems } from "@utilities/api";

export default async function ShoppingSearchPage() {
  // const mock = [
  //   { name: "test1", category: "", price: 12.00, },
  //   { name: "test2", category: "", price: 12.00, },
  //   { name: "test3", category: "", price: 12.00, },
  // ]
  // let items: ShoppingItem[] = mock as ShoppingItem[];
  let items: ShoppingItem[] = await getShoppingItems();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-32 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <h1 className="text-zinc-950 dark:text-zinc-50 text-2xl font-bold">Shopping Search</h1>
          <p className="text-gray-600">Search for products and find the best deals!</p>
          <div className="w-full p-2">
            <ShoppingCatelog items={items} />
          </div>
        </div>
      </main>
    </div>
  );
}
