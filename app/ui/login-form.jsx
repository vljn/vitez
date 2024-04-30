import Button from './button';
import Link from 'next/link';

export default function LoginForm() {
  return (
    <div className="w-full max-w-lg mx-4">
      <form className="rounded border-2 border-primary px-6 pt-4 pb-6 shadow-xl">
        {/*<div className="mb-4">
          <label htmlFor="email" className="block font-bold text-sm mb-2 lg:text-lg">
            Мејл
          </label>
          <input
            type="text"
            id="email"
            className="appearance-none rounded bg-primary border-none text-knight-white focus: px-3 py-2 w-full leading-tight focus:ring-knight-white"
          />
  </div>*/}
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold text-sm mb-2 lg:text-lg">
            Корисничко име
          </label>
          <input
            type="text"
            id="username"
            className="appearance-none rounded bg-primary border-none text-knight-white focus: px-3 py-2 w-full leading-tight focus:ring-knight-white"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold text-sm mb-2 lg:text-lg">
            Лозинка
          </label>
          <input
            type="password"
            id="password"
            className="appearance-none rounded bg-primary border-none text-knight-white focus: px-3 py-2 w-full leading-tight focus:ring-knight-white"
          />
        </div>
        <div className="">
          <Button>Улогуј се</Button>
        </div>
        <p className="text-sm lg:text-base mt-3">
          Немаш налог? Направи налог{' '}
          <Link href="/register" className="font-bold hover:underline">
            овде
          </Link>
        </p>
      </form>
    </div>
  );
}
