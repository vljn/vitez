import HeaderAndSidenav from '../ui/headerAndSidenav';
import { auth } from '@/auth';
import { getUser } from '../lib/data';

export default async function Layout({ children }) {
  const session = await auth();
  let user = null;
  if (session?.user) {
    user = await getUser(session?.user.id);
  }
  return (
    <>
      <HeaderAndSidenav link={true} username={user.korisnicko_ime} />
      {children}
    </>
  );
}
