import Image from 'next/image';
import Knight from '../public/knight.svg';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col lg:flex-row justify-center items-center gap-10">
      <div className="px-8">
        <h1 className="text-8xl mt-10 lg:text-[15em] font-title text-primary text-center">404</h1>
        <h2 className="text-center text-xl">Polje do kog pokušavate da dođete je nedostižno</h2>
      </div>
      <Image src={Knight} alt="Ikonica konja" />
    </div>
  );
}
