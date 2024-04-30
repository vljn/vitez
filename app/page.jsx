import Title from './ui/title';
import Button from './ui/button';
import Board from './ui/board';
import AllSquares from './ui/allSquares';

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:h-svh lg:w-full lg:px-24 lg:gap-8 text-primary xl:gap-24">
      <div className="max-lg:mb-6">
        <Title>Витез</Title>
        <p className="text-center px-6 lg:px-0 sm:text-xl lg:text-base xl:text-lg">
          Опште је познато да је коњ фигура која може доћи до било ког поља на табли, независно од
          поља са ког креће, као и да може посетити свако поље на табли, а да не посети исто поље
          два пута
        </p>
      </div>
      <AllSquares />
    </main>
  );
}
