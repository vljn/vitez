'use client';

import FormButton from '../formButton';
import FormField from '../formField';
import { useFormState } from 'react-dom';
import { updatePassword } from '@/app/lib/actions';
import FormError from '../formError';

export default function PasswordForm({ id }) {
  const [state, action] = useFormState(updatePassword, undefined);
  console.log(state?.errors);
  console.log(id);
  return (
    <form action={action}>
      <input type="hidden" name="id" value={id} />
      <FormField
        type="text"
        name="password"
        id="password"
        label="Тренутна лозинка"
        error={!state?.errors?.id && state?.errors?.password && state?.errors?.password[0]}
      />
      <FormField
        type="text"
        name="newPassword"
        id="newPassword"
        label="Нова лозинка"
        last={true}
        error={!state?.errors?.id && state?.errors?.newPassword && state?.errors?.newPassword[0]}
      />
      {state?.errors?.id && <FormError text={state.errors.id[0]} />}
      {state?.message && <FormError text={state.message} />}
      {state?.messageSuccess && <p className="my-1 text-base">{state.messageSuccess}</p>}
      <FormButton background={true}>Промени</FormButton>
    </form>
  );
}
