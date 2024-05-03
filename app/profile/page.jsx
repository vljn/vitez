import { auth } from '@/auth';
import ProfileForm from '../ui/profile/profileForm';
import { getUser } from '../lib/data';

export default async function Page() {
  const session = await auth();
  let id, username, email;
  if (session?.user) {
    const user = await getUser(session.user.id);
    id = user.id;
    username = user.korisnicko_ime;
    email = user.mejl;
  }

  return (
    <div className="p-8 bg-secondary rounded-lg shadow-xl border-primary border-2 ">
      <h1 className="text-lg font-bold lg:text-2xl">Подаци о профилу</h1>
      <p className="text-sm mb-4">Овде је могуће изменити податке о профилу</p>
      <ProfileForm id={id} username={username} email={email} />
    </div>
  );
}
