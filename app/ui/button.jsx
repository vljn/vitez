export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-slate-300 px-2 py-1 text-base sm:text-lg rounded`}
    >
      {children}
    </button>
  );
}
