import HeaderAndSidenav from '../ui/headerAndSidenav';
import { auth } from '@/auth';
import { getUser } from '../lib/data';
import SignOutClient from '../ui/signOutClient';

export default async function Layout({ children }) {
  const session = await auth();
  let user = null;
  let signOut = false;
  console.log('sesija: ', session);
  if (session?.user) {
    user = await getUser(session?.user.id);
    if (!user) {
      console.log('ima sesiju nema ga u bazi');
      console.log('user iz baze: ', user);
      signOut = true;
      console.log('signOut: ', signOut);
    }
  }

  return (
    <>
      {signOut && <SignOutClient />}
      <HeaderAndSidenav link={true} username={user?.korisnicko_ime} />
      {children}
    </>
  );
}
