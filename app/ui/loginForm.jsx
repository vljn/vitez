'use client';

import FormButton from './formButton';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from '../lib/actions';

export default function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <div className="w-full max-w-lg mx-4">
      <form
        action={action}
        className="rounded border-2 border-primary px-6 pt-4 pb-6 shadow-xl mx-4 bg-secondary"
      >
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold text-sm mb-2 lg:text-lg">
            Корисничко име
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="appearance-none rounded bg-primary border-none text-knight-white focus: px-3 py-2 w-full leading-tight focus:ring-knight-white"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="password" className="block font-bold text-sm mb-2 lg:text-lg">
            Лозинка
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="appearance-none rounded bg-primary border-none text-knight-white focus: px-3 py-2 w-full leading-tight focus:ring-knight-white"
          />
        </div>
        {state?.error && <p className="mb-1 text-base text-red-800">{state.error}</p>}
        <FormButton>Улогуј се</FormButton>
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