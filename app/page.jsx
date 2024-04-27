import Title from './ui/title';
import Button from './ui/button';

export default function Home() {
  return (
    <>
      <Title />
      <div className={`flex justify-center gap-6`}>
        <Button>Postavi konja</Button>
        <Button>Postavi kraj</Button>
      </div>
    </>
  );
}
