export default function Cell({ color }) {
  return (
    <div
      className={`square ${color} w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20`}
    ></div>
  );
}
