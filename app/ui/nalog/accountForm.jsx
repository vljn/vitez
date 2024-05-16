'use client';

import FormButton from '../forms/formButton';
import FormFieldControlled from '../forms/formFieldControlled';
import { useFormState } from 'react-dom';
import { update } from '@/app/lib/actions';
import FormError from '../forms/formError';

export default function AccountForm({ id, username, email }) {
  const [state, action] = useFormState(update, undefined);

  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <FormFieldControlled
        initialValue={username}
        type="text"
        name="username"
        id="username"
        label="Корисничко име"
        error={!state?.errors?.id && state?.errors?.username}
      />
      <FormFieldControlled
        initialValue={email}
        type="text"
        name="email"
        id="email"
        label="Мејл"
        last={true}
        error={!state?.errors?.id && state?.errors?.email}
      />
      {state?.errors?.id && <FormError text={state.errors.id[0]} />}
      {state?.message && <FormError text={state.message} />}
      {state?.messageSuccess && <p className="my-1 text-base">{state.messageSuccess}</p>}
      <FormButton background={true}>Сачувај</FormButton>
    </form>
  );
}
