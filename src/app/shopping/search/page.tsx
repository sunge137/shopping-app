import ShoppingCatelog from "@components/ShoppingCatelog";

export default function ShoppingSearchPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-6xl flex-col items-center justify-between py-32 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <h1 className="text-zinc-950 dark:text-zinc-50 text-2xl font-bold">Shopping Search</h1>
          <p className="text-gray-600">Search for products and find the best deals!</p>
          <div className="w-full p-2">
            <ShoppingCatelog />
          </div>
        </div>
      </main>
    </div>
  );
}
