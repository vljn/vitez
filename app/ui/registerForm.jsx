'use client';

import FormButton from './formButton';
import { register } from '../lib/actions';
import { useFormState } from 'react-dom';
import FormField from './formField';

export default function RegisterForm() {
  const [state, action] = useFormState(register, undefined);

  return (
    <div className="w-full max-w-lg mx-4">
      <form
        action={action}
        className="rounded border-2 border-primary px-6 pt-4 pb-6 shadow-xl mx-4 bg-secondary"
      >
        <FormField
          label="Мејл"
          id="email"
          name="email"
          type="text"
          error={state?.errors?.email && state.errors.email[0]}
        />
        <FormField
          label="Корисничко име"
          id="username"
          name="username"
          type="text"
          error={state?.errors?.username && state.errors.username[0]}
        />
        <FormField
          label="Лозинка"
          id="password"
          name="password"
          type="password"
          error={state?.errors?.password && state.errors.password[0]}
        />
        <FormField
          label="Потврди лозинку"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          error={state?.errors?.confirmPassword && state.errors.confirmPassword[0]}
          last={true}
        />
        {state?.message && <p>state.message</p>}
        <FormButton>Региструј се</FormButton>
      </form>
    </div>
  );
}
