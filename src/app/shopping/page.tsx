export default function ShoppingPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between rounded-2xl border border-zinc-200 bg-white px-16 py-32 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-zinc-950 dark:text-zinc-50">
          Welcome to the Shopping Page!
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          Here you can find a variety of products to purchase. Browse through our categories and find the best deals!
        </p>
      </main>
    </div>
  );
}
