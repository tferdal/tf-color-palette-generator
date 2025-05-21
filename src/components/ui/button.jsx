export function Button({ children, ...props }) {
  return (
    <button
      className="px-6 py-2 text-lg rounded-2xl shadow-xl bg-black text-white hover:bg-neutral-800 active:scale-95 transition"
      {...props}
    >
      {children}
    </button>
  );
}