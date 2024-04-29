import Title from './ui/title';
import Button from './ui/button';
import Board from './ui/board';

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row items-center lg:justify-between lg:h-svh lg:w-full lg:px-24 lg:gap-8">
      <div className="">
        <Title />
        <div className="text-center px-6 lg:px-0 sm:text-xl lg:text-base xl:text-xl">
          <p>
            Opšte je poznato da je konj figura koja može doći do bilo kog polja na tabli, nezavisno
            od polja sa kog kreće
          </p>
          <p>Ova aplikacija služi kao simulacija kretanja konja po šahovskoj tabli</p>
        </div>
        <div className="flex justify-center gap-6 my-6">
          <Button>Postavi konja</Button>
          <Button>Postavi cilj</Button>
        </div>
      </div>
      <Board />
    </main>
  );
}
