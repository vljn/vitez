import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Square({ color, visited }) {
  return (
    <div
      className={`square w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-${color} text-center ${
        color === 'primary' ? 'text-secondary' : 'text-primary'
      } flex items-center justify-center text-lg lg:text-2xl`}
    >
      {visited && visited.index}
    </div>
  );
}