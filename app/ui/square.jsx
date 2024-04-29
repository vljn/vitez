import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Square({ color, visited }) {
  return (
    <div className={`square w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 ${color}`}>
      {visited && <XMarkIcon color="#FCDFD0" />}
    </div>
  );
}
