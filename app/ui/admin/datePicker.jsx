import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

export default function DatePicker({ date, setDate }) {
  return (
    <div className="bg-primary text-knight-white flex justify-between items-center w-56 m-auto rounded-xl mt-10 lg:mt-0">
      <button
        className="px-2 border-r border-knight-white h-10"
        onClick={() => {
          setDate(date.plus({ days: -1 }));
        }}
      >
        <ArrowLeftIcon className="w-6" />
      </button>
      <span className="text-xl mx-2">{date.setLocale('sr-rs').toLocaleString()}</span>
      <button
        className="px-2 border-l border-knight-white h-10"
        onClick={() => {
          setDate(date.plus({ days: 1 }));
        }}
      >
        <ArrowRightIcon className="w-6" />
      </button>
    </div>
  );
}
