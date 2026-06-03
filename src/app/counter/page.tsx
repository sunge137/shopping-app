import Counter from "./Counter";

function CounterPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <Counter />
        <h1 className="text-3xl font-semibold text-center">
          Tailwind CSS v4.0 Theme Colors Example
        </h1>
      </main>
    </div>
  );
}
export default CounterPage;