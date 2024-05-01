import Link from 'next/link';
import Title from './title';

export default function TitleToHome() {
  return (
    <div className="text-6xl lg:text-8xl font-title drop-shadow-2xl select-none lg:hover:scale-105 transition-transform">
      <Link href="/">
        <h1>Витез</h1>
      </Link>
    </div>
  );
}
