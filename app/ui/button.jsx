export default function Button({ children, onClick, className, active, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`${className} border-primary border-2 px-2 py-1 text-base sm:text-lg rounded hover:text-knight-white transition-all ${
        !active && !disabled && 'bg-secondary hover:bg-primary'
      } ${active && 'bg-primary text-knight-white'} ${
        disabled && 'hover:cursor-not-allowed  bg-gray-600 hover:bg-gray-600 text-knight-white'
      }`}
    >
      {children}
    </button>
  );
}
