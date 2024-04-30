import Title from './ui/title';
import Button from './ui/button';
import Board from './ui/board';
import AllSquares from './ui/allSquares';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:h-svh lg:w-full lg:px-24 lg:gap-8 text-primary xl:gap-24">
      <div className="max-lg:mb-2 sm:text-xl lg:text-base xl:text-lg">
        <Title>Витез</Title>
        <Link href="/login" className="lg:hidden text-knight-primary absolute top-7 left-8">
          <UserCircleIcon className="w-8" />
        </Link>
        <p className="px-6 max-lg:text-center lg:px-0">
          Опште је познато да је коњ фигура која може доћи до било ког поља на табли, независно од
          поља са ког креће, као и да може посетити свако поље на табли, а да не посети исто поље
          два пута
        </p>
        <Link
          href="/login"
          className="max-lg:hidden border-2 border-primary rounded text-primary hover:bg-primary hover:text-knight-white transition-colors mt-10 flex justify-between items-center w-36 p-2"
        >
          <span>Улогуј се</span> <ArrowRightIcon className="w-6" />
        </Link>
      </div>
      <AllSquares />
    </main>
  );
}
