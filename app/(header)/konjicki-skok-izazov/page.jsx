import KnightsTourChallange from '@/app/ui/KnightsTourChallange';
import KnightsTour from '@/app/ui/knightsTour';
import Leaderboard from '@/app/ui/konjicki-skok-izazov/leaderboard';
import { auth } from '@/auth';

export default async function Page() {
  const session = await auth();

  return (
    <main>
      <h1 className="text-center text-xl font-bold sm:text-2xl lg:text-4xl xl:text-5xl my-4 xl:mt-0 lg:mt-0">
        Коњички скок: изазов
      </h1>
      <p className="text-lg md:text-xl lg:text-xl text-center xl:px-32 mb-6">
        Пробај да решиш проблем коњичког скока. Направи што већи број потеза, али тако да не станеш
        на исто поље два пута.
      </p>
      <Leaderboard challenge="konjicki skok" />
      <div className="flex justify-center">
        <KnightsTourChallange id={session?.user?.id} />
      </div>
    </main>
  );
}
