'use client';

import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useFormStatus } from 'react-dom';

export default function FormButton({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className={`border-primary border-2 px-2 py-1 text-base sm:text-lg rounded hover:bg-primary hover:text-knight-white transition-all w-52 flex justify-center items-center`}
    >
      {pending ? <ArrowPathIcon className="w-7 animate-spin" /> : children}
    </button>
  );
}
