export default function Square({ background, visited, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`square ${background} w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-center ${
        background === 'bg-primary' ? 'text-secondary' : 'text-primary'
      } flex items-center justify-center text-lg lg:text-2xl`}
    >
      {visited && visited.index}
    </div>
  );
}
