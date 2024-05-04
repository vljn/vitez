import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Links from '../../ui/nalog/links';

export default async function Layout({ children }) {
  const session = await auth();
  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <div className="px-8 lg:grid lg:grid-cols-4 lg:gap-14">
        <aside>
          <Links />
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </>
  );
}
