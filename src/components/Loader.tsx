export default function Loader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs cursor-wait [body:has(&)]:overflow-hidden"
      role="status"
      aria-live="polite"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
    </div>
  );
}
