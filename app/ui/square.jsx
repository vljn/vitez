export default function Square({ background, visited, onClick, end }) {
  return (
    <div
      onClick={onClick}
      className={`square ${
        !end && background
      } w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 text-center ${
        background === 'bg-primary' && !end ? 'text-secondary' : 'text-primary'
      } flex items-center justify-center text-lg lg:text-2xl ${end && 'bg-red-800'}`}
    >
      {visited && visited.index}
    </div>
  );
}
