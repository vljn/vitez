import { signOut } from '../../auth.ts';

export function SignOutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Излогуј се</button>
    </form>
  );
}
