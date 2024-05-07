import AllSquares from '../ui/allSquares';
import Link from 'next/link';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <>
      <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:w-full lg:px-24 lg:gap-8 text-primary xl:gap-24">
        <div className="max-lg:mb-4 sm:text-xl lg:text-base xl:text-2xl max-lg:text-center lg:flex lg:justify-center lg:items-center lg:flex-col px-6 lg:px-0 text-center xl:mt-6">
          <p>
            Опште је познато да је коњ фигура која може доћи до било ког поља на табли, независно од
            поља са ког креће, као и да може посетити свако поље на табли, а да не посети исто поље
            два пута
          </p>
          <p>
            На овај страници приказана је симулација{' '}
            <Link href="/problem_konjickog_skoka" className="underline text-blue-700">
              проблема коњичког скока
            </Link>{' '}
            (Knight&apos;s tour) почевши из горњег левог угла шаховске табле
          </p>
          {!session?.user && (
            <p className="italic lg:mt-8 text-sm">
              (За приступ целокупном садржају је потребно бити улогован)
            </p>
          )}
        </div>
        <AllSquares />
      </main>
    </>
  );
}
