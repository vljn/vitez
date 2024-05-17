import { getUsers } from '@/app/lib/data';
import { TrashIcon } from '@heroicons/react/24/solid';
import { deleteUser } from '@/app/lib/actions';

export default async function Page() {
  const users = await getUsers();

  return (
    <>
      <p>*Брисањем корисника бришу се и његови постигнути резултати</p>
      <div className="relative overflow-x-auto shadow-md rounded-lg mb-10">
        <table className="w-full text-left text-sm">
          <thead className="uppercase bg-primary text-knight-white">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Корисничко име</th>
              <th className="px-6 py-4">Мејл</th>
              <th className="px-6 py-4">
                <span className="sr-only">Избриши</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-primary bg-secondary hover:bg-secondary-brighter last:border-b-0"
              >
                <td className="px-6 py-2">{user.id}</td>
                <td className="px-6 py-2">{user.korisnicko_ime}</td>
                <td className="px-6 py-2">{user.mejl}</td>
                <td>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <button type="submit">
                      <TrashIcon className="w-6 hover:cursor-pointer" />
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
