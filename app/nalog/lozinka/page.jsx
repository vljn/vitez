import { auth } from '@/auth';
import PasswordForm from '../../ui/nalog/passwordForm';
import { getUser } from '../../lib/data';

export default async function Page() {
  const session = await auth();
  let id;
  if (session?.user) {
    const user = await getUser(session.user.id);
    id = user.id;
  }

  return (
    <div className="p-8 bg-secondary rounded-lg shadow-xl border-primary border-2">
      <h1 className="text-lg font-bold mb-4 lg:text-2xl">Промена лозинке</h1>
      <PasswordForm id={id} />
    </div>
  );
}
