import KnightMoves from '@/app/ui/simulations/knightMoves';

export default function Page() {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:w-full lg:px-24 lg:gap-8 xl:gap-24">
      <article className="max-lg:mb-4 sm:text-xl lg:text-base xl:text-2xl max-lg:text-center px-6 lg:px-0 text-center">
        <h1 className="text-center text-xl font-bold sm:text-2xl lg:text-4xl xl:text-5xl my-4 xl:mt-0 xl:mb-8 lg:mt-0">
          Најкраћи пут
        </h1>
        <p>
          Коњ је једна од фигура која може доћи до било ког поља на шаховској табли, независно од
          поља са ког креће.
        </p>
        <p>
          На овој страници доступна је симулација кретања коња од поља до поља у најмањем броју
          потеза
        </p>
      </article>
      <div className="flex justify-center mt-8">
        <KnightMoves />
      </div>
    </main>
  );
}
