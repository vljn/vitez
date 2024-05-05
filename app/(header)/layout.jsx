import HeaderAndSidenav from '../ui/headerAndSidenav';
import { auth } from '@/auth';
import { getUser } from '../lib/data';
import SignOutClient from '../ui/signOutClient';

export default async function Layout({ children }) {
  const session = await auth();
  let user = null;
  if (session?.user) {
    user = await getUser(session?.user.id);
    if (!user) {
      return <SignOutClient />;
    }
  }

  return (
    <>
      <HeaderAndSidenav username={user?.korisnicko_ime} />
      {children}
    </>
  );
}
