import { auth } from '@/auth';
import { getUser } from '../lib/data';
import HeaderAndSidenav from '../ui/headerAndSidenav';
import { redirect } from 'next/navigation';
import Links from '../ui/profile/links';

export default async function Layout({ children }) {
  const session = await auth();
  let user = null;
  if (session?.user) {
    user = await getUser(session?.user.id);
  } else {
    redirect('/login');
  }

  return (
    <>
      <HeaderAndSidenav username={user?.korisnicko_ime} link={true} />
      <div className="px-8 lg:grid lg:grid-cols-4">
        <aside>
          <Links />
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </>
  );
}
