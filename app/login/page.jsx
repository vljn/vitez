import LoginForm from '../ui/loginForm';
import Title from '../ui/title';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  console.log(session);
  console.log(session?.user);
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
