export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-secondary border-primary border-2 px-2 py-1 text-base sm:text-lg rounded hover:bg-primary hover:text-knight-white transition-all`}
    >
      {children}
    </button>
  );
}
