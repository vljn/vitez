import { auth } from '@/auth';
import AccountForm from '../../ui/nalog/accountForm';
import { getUser } from '../../lib/data';
import SignOutClient from '@/app/ui/signOutClient';

export default async function Page() {
  const session = await auth();
  let id, username, email;
  if (session?.user) {
    const user = await getUser(session.user?.id);
    if (!user) {
      return <SignOutClient />;
    }
    id = user?.id;
    username = user?.korisnicko_ime;
    email = user?.mejl;
  }

  return (
    <div className="p-8 bg-secondary rounded-lg shadow-xl border-primary border-2 ">
      <h1 className="text-lg font-bold lg:text-2xl">Подаци о налогу</h1>
      <p className="text-sm mb-4">Овде је могуће изменити податке о налогу</p>
      <AccountForm id={id} username={username} email={email} />
    </div>
  );
}
