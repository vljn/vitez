import LoginForm from '../ui/login-form';
import Title from '../ui/title';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    redirect('/');
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2 min-h-svh">
        <Title link={true}>Витез</Title>
        <LoginForm />
      </div>
    </>
  );
}
