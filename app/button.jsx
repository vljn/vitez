export default function Button({ children }) {
  return (
    <button className={`bg-primary text-slate-300 px-2 py-1 text-lg rounded`}>{children}</button>
  );
}
