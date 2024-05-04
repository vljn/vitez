import HeaderAndSidenav from '../ui/headerAndSidenav';
import { auth } from '@/auth';
import { getUser } from '../lib/data';
import { signOut } from 'next-auth/react';

export default async function Layout({ children }) {
  const session = await auth();
  let user = null;
  if (session?.user) {
    user = await getUser(session?.user.id);
    if (!user) {
      signOut();
    }
    console.log('sesija: ', session);
    console.log('sesija korisnik: ', session?.user);
    console.log('getUser: ', user);
  }

  return (
    <>
      <HeaderAndSidenav link={true} username={user?.korisnicko_ime} />
      {children}
    </>
  );
}
