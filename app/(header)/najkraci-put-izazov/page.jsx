import { getTodaysChallenge, getTodaysChallengeFigures } from '@/app/lib/data';
import KnightMovesChallenge from '@/app/ui/knightMovesChallenge';
import Leaderboard from '@/app/ui/konjicki-skok-izazov/leaderboard';
import { auth } from '@/auth';

export default async function Page() {
  const challenge = await getTodaysChallenge();
  const figures = await getTodaysChallengeFigures();
  const session = await auth();

  return (
    <main>
      <h1 className="text-center text-xl font-bold sm:text-2xl lg:text-4xl xl:text-5xl my-4 xl:mt-0 lg:mt-0">
        Најкраћи пут: изазов
      </h1>
      <p className="text-lg md:text-xl lg:text-xl text-center xl:px-32 mb-6">
        Пробај да стигнеш од почетног до крајњег (црвеног) поља у минималном броју потеза, без
        стајања на исто поље или на поље на ком коњ може бити поједен.
      </p>
      <Leaderboard challenge="najkraci put" />
      <div className="flex justify-center">
        {challenge ? (
          <KnightMovesChallenge challenge={challenge} figures={figures} id={session?.user?.id} />
        ) : (
          <h2 className="text-center mt-6">
            Данашњи изазов још увек није доступан, покушај касније
          </h2>
        )}
      </div>
    </main>
  );
}
