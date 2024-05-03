import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="bg-secondary border-2 border-primary rounded hover:bg-primary hover:text-knight-white transition-colors sm:flex sm:gap-2 sm:justify-between sm:items-center lg:w-40 xl:w-56 text-sm sm:text-lg p-2"
    >
      <span>Улогуј се</span> <ArrowRightIcon className="w-6 xl:w-8 max-sm:hidden" />
    </Link>
  );
}
