import { getScores } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import { DateTime } from 'luxon';

export default async function Page({ searchParams }) {
  const challenge = searchParams.izazov || null;
  let scores = [];
  try {
    scores = await getScores(challenge);
  } catch (error) {
    if (error.name === 'InvalidChallengeError') {
      redirect('/admin/rezultati');
    } else {
      console.error(error);
    }
  }

  return (
    <>
      <div className="mb-4">
        <a
          href="?izazov="
          className="mr-2 px-4 py-2 bg-secondary text-primary rounded border-2 border-primary hover:border-primary hover:bg-primary hover:text-knight-white transition-colors"
        >
          Прикажи све
        </a>
        <a
          href="?izazov=najkraci%20put"
          className="mr-2 px-4 py-2 bg-secondary text-primary rounded border-2 border-primary hover:border-primary hover:bg-primary hover:text-knight-white transition-colors"
        >
          Најкраћи пут
        </a>
        <a
          href="?izazov=konjicki%20skok"
          className="px-4 py-2 bg-secondary text-primary rounded border-2 border-primary hover:border-primary hover:bg-primary hover:text-knight-white transition-colors"
        >
          Коњички скок
        </a>
      </div>
      <div className="relative overflow-x-auto shadow-md rounded-lg mb-10">
        <table className="w-full text-left text-sm">
          <thead className="uppercase bg-primary text-knight-white">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Корисничко име</th>
              <th className="px-6 py-4">Резултат</th>
              <th className="px-6 py-4">Време</th>
              <th className="px-6 py-4">Изазов</th>
              <th className="px-6 py-4">Статус</th>
              <th className="px-6 py-4">Датум</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score) => (
              <tr
                key={score.id}
                className="border-b border-primary bg-secondary hover:bg-secondary-brighter last:border-b-0"
              >
                <td className="px-6 py-2">{score.id}</td>
                <td className="px-6 py-2">{score.korisnicko_ime}</td>
                <td className="px-6 py-2">{score.rezultat}</td>
                <td className="px-6 py-2">{score.vreme}</td>
                <td className="px-6 py-2">{score.tip}</td>
                <td className="px-6 py-2">{score.status}</td>
                <td className="px-6 py-2">{DateTime.fromJSDate(score.datum).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
