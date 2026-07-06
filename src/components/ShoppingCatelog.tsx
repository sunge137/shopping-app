import { ShoppingItem } from "@model/ShoppingItem";
import ShoppingAddCard from "@components/ShoppingAddCard";

interface ShoppingCatelogProps {
  items: ShoppingItem[];
}

function ShoppingCatelog({
  items,
}: Readonly<ShoppingCatelogProps>) {
  return (
    <div className="w-full p-6 bg-white dark:bg-zinc-950 rounded-lg shadow border border-zinc-200 dark:border-zinc-800">
      <div className="grid grid-cols-[repeat(auto-fill,240px)] gap-4 max-w-full mx-auto" style={{ justifyContent: "start" }}>
        {items.map((item, index) => (
          <div
            key={index + item.name}
            className="w-[240px] h-[240px] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 overflow-hidden flex flex-col justify-between items-stretch transition-all duration-200 ease-in-out hover:bg-zinc-50 dark:hover:bg-zinc-800/50 active:scale-[0.99]"
          >
            <ShoppingAddCard item={item}>
              <div className="p-4 flex-1 flex flex-col justify-start overflow-hidden">
                <h3 className="line-clamp-2 text-sm font-medium leading-snug break-words text-zinc-900 dark:text-zinc-50">
                  {item.name}
                </h3>
              </div>
              <div className="p-4 pt-0 shrink-0">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-200">
                  {item.price}
                </p>
              </div>
            </ShoppingAddCard>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingCatelog;
