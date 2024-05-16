import { auth } from '@/auth';
import { getUser } from '@/app/lib/data';
import SignOutClient from '@/app/ui/signOutClient';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session?.user) {
    const user = await getUser(session?.user.id);
    if (!user) {
      return <SignOutClient />;
    }
    if (user.uloga !== 'admin') {
      redirect('/');
    }
  }

  return;
}
