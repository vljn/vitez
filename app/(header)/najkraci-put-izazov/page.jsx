import { getTodaysChallenge, getTodaysChallengeFigures } from '@/app/lib/data';
import KnightMovesChallenge from '@/app/ui/knightMovesChallenge';

export default async function Page() {
  const challenge = await getTodaysChallenge();
  const figures = await getTodaysChallengeFigures();

  return (
    <main>
      <h1 className="text-center text-xl font-bold sm:text-2xl lg:text-4xl xl:text-5xl my-4 xl:mt-0 lg:mt-0">
        Најкраћи пут: изазов
      </h1>
      <p className="text-lg md:text-xl lg:text-xl text-center xl:px-32 mb-6">
        Пробај да стигнеш од почетног до крајњег (црвеног) поља у минималном броју потеза, без
        стајања на исто поље или на поље на ком коњ може бити поједен.
      </p>
      <div className="flex justify-center">
        {challenge ? (
          <KnightMovesChallenge challenge={challenge} figures={figures} />
        ) : (
          <h2 className="text-center">Данашњи изазов још увек није доступан, покушај касније</h2>
        )}
      </div>
    </main>
  );
}
