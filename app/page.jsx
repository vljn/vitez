import Title from './ui/title';
import Button from './ui/button';
import Board from './ui/board';

export default function Home() {
  return (
    <main className="md:flex md:justify-between md:h-svh md:w-full md:items-center">
      <div className="">
        <Title />
        <div className={`flex justify-center gap-6`}>
          <Button>Postavi konja</Button>
          <Button>Postavi kraj</Button>
        </div>
      </div>
      <Board />
    </main>
  );
}
