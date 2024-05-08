export default function Button({ children, onClick, className, active }) {
  return (
    <button
      onClick={onClick}
      className={`border-primary border-2 px-2 py-1 text-base sm:text-lg rounded hover:bg-primary hover:text-knight-white transition-all ${className} ${
        active ? 'bg-primary text-knight-white' : 'bg-secondary'
      }`}
    >
      {children}
    </button>
  );
}
