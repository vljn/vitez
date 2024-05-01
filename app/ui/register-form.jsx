'use client';

import { Input } from 'postcss';
import FormButton from './formButton';
import Link from 'next/link';
import { register } from '../lib/actions';
import { useFormState } from 'react-dom';

export default function RegisterForm() {
  const [state, action] = useFormState(register, undefined);

  return (
    <div className="w-full max-w-lg mx-4">
      <form
        action={action}
        className="rounded border-2 border-primary px-6 pt-4 pb-6 shadow-xl bg-secondary"
      >
        <div className="mb-3">
          <label htmlFor="email" className="block font-bold text-sm mb-2 lg:text-lg">
            Мејл
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="appearance-none rounded bg-primary text-knight-white px-3 py-2 w-full leading-tight focus:ring-2 focus:ring-knight-white focus:invalid:ring-red-600 border-none"
          />
          {state?.errors?.email &&
            state.errors.email.map((error) => (
              <p className="mt-1 text-base text-red-800" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="mb-4">
          <label htmlFor="username" className="block font-bold text-sm mb-2 lg:text-lg">
            Корисничко име
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="appearance-none rounded bg-primary text-knight-white px-3 py-2 w-full leading-tight focus:ring-2 focus:ring-knight-white focus:invalid:ring-red-600 border-none"
          />
          {state?.errors?.username &&
            state.errors.username.map((error) => (
              <p className="mt-1 text-base text-red-800" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-bold text-sm mb-2 lg:text-lg">
            Лозинка
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="appearance-none rounded bg-primary text-knight-white px-3 py-2 w-full leading-tight focus:ring-2 focus:ring-knight-white focus:invalid:ring-red-600 border-none"
          />
          {state?.errors?.password &&
            state.errors.password.map((error) => (
              <p className="mt-1 text-base text-red-800" key={error}>
                {error}
              </p>
            ))}
        </div>
        <div className="mb-8">
          <label htmlFor="confirmPassword" className="block font-bold text-sm mb-2 lg:text-lg">
            Потврди лозинку
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="appearance-none rounded bg-primary text-knight-white px-3 py-2 w-full leading-tight focus:ring-2 focus:ring-knight-white focus:invalid:ring-red-600 border-none"
          />
          {state?.errors?.confirmPassword &&
            state.errors.confirmPassword.map((error) => (
              <p className="mt-1 text-base text-red-800" key={error}>
                {error}
              </p>
            ))}
        </div>
        {state?.message && <p>state.message</p>}
        <FormButton>Региструј се</FormButton>
      </form>
    </div>
  );
}
