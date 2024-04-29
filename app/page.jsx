import Title from './ui/title';
import Button from './ui/button';
import Board from './ui/board';
import AllSquares from './ui/allSquares';

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:h-svh lg:w-full lg:px-24 lg:gap-8">
      <div className="">
        <Title />
        <p className="text-center px-6 lg:px-0 sm:text-xl lg:text-base xl:text-xl">
          Opšte je poznato da je konj figura koja može doći do bilo kog polja na tabli, nezavisno od
          polja sa kog kreće, kao i da može posetiti svako polje na tabli, a da ne poseti isto polje
          dva puta
        </p>
      </div>
      <AllSquares />
    </main>
  );
}
