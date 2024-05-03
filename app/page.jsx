import AllSquares from './ui/allSquares';
import { auth } from '@/auth';
import HeaderAndSidenav from './ui/headerAndSidenav';
import { getUser } from './lib/data';

export default async function Home() {
  const session = await auth();
  let user = null;
  if (session?.user) {
    user = await getUser(session?.user.id);
  }

  return (
    <>
      <HeaderAndSidenav username={user?.korisnicko_ime} link={false} />
      <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:w-full lg:px-24 lg:gap-8 text-primary xl:gap-24">
        <div className="max-lg:mb-4 sm:text-xl lg:text-base xl:text-3xl max-lg:text-center lg:flex lg:justify-center lg:items-center lg:flex-col">
          <div className="px-6 lg:px-0 text-center xl:mt-6">
            <p>
              Опште је познато да је коњ фигура која може доћи до било ког поља на табли, независно
              од поља са ког креће, као и да може посетити свако поље на табли, а да не посети исто
              поље два пута
            </p>
            <p>
              На овај страници приказана је симулација проблема коњичког скока (Knight&apos;s tour)
              почевши из горњег левог угла шаховске табле
            </p>
          </div>
        </div>
        <AllSquares />
      </main>
    </>
  );
}
