import Title from './ui/title';
import Button from './ui/button';
import Board from './ui/board';
import AllSquares from './ui/allSquares';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { auth, signOut, signIn } from '@/auth';
import Menu from './ui/menu';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Menu session={session} />
      <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:h-svh lg:w-full lg:px-24 lg:gap-8 text-primary xl:gap-24">
        <Link
          href="/login"
          className="lg:hidden absolute z-10 top-7 left-8 rounded border-2 border-primary bg-secondary"
        >
          <UserCircleIcon className="w-8" />
        </Link>
        <div className="max-lg:mb-2 sm:text-xl lg:text-base xl:text-3xl max-lg:text-center lg:flex lg:justify-center lg:items-center lg:flex-col">
          <Title>Витез</Title>
          <p className="px-6 lg:px-0 text-center xl:mt-6">
            Опште је познато да је коњ фигура која може доћи до било ког поља на табли, независно од
            поља са ког креће, као и да може посетити свако поље на табли, а да не посети исто поље
            два пута
          </p>
          {!session?.user && (
            <Link
              href="/login"
              className="max-lg:hidden bg-secondary border-2 border-primary rounded hover:bg-primary hover:text-knight-white transition-colors lg:mt-10 xl:mt-20 flex justify-between items-center lg:w-40 xl:w-56 p-4"
            >
              <span>Улогуј се</span> <ArrowRightIcon className="w-6 xl:w-8" />
            </Link>
          )}
        </div>
        <AllSquares />
      </main>
    </>
  );
}
