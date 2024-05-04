'use client';

import FormButton from './formButton';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import { login } from '../lib/actions';
import FormField from './formField';
import FormError from './formError';

export default function LoginForm() {
  const [state, action] = useFormState(login, undefined);

  return (
    <div className="w-full max-w-lg mx-4">
      <form
        action={action}
        className="rounded border-2 border-primary px-6 pt-4 pb-6 shadow-xl mx-4 bg-secondary"
      >
        <FormField label="Корисничко име" id="username" name="username" type="text" />
        <FormField label="Лозинка" id="password" name="password" type="password" last={true} />
        {state?.error && <FormError text={state.error} />}
        <FormButton>Улогуј се</FormButton>
        <p className="text-sm lg:text-base mt-3">
          Немаш налог? Направи налог{' '}
          <Link href="/registracija" className="font-bold hover:underline">
            овде
          </Link>
        </p>
      </form>
    </div>
  );
}
