import { getHighestScores } from '@/app/lib/data';

export default async function Leaderboard(challenge) {
  const highestScores = await getHighestScores(challenge);
  if (highestScores.length < 1) return;
  return (
    <div className="mx-auto sm:max-w-[600px] sm:mx-auto">
      <table className="w-full shadow-md bg-secondary">
        <thead className="uppercase bg-primary text-sm text-knight-white text-left">
          <tr>
            <th className="px-2 sm:px-6">корисник</th>
            <th className="px-2 sm:px-6">резултат</th>
            <th className="px-2 sm:px-6">време</th>
          </tr>
        </thead>
        <tbody>
          {highestScores.map((score, index) => (
            <tr
              key={score.korisnicko_ime}
              className={`border-primary ${
                index + 1 === highestScores.length ? 'border-b-none' : 'border-b-[1px]'
              }`}
            >
              <td className="px-2 sm:px-6">{score.korisnicko_ime}</td>
              <td className="px-2 sm:px-6">{score.rezultat}</td>
              <td className="px-2 sm:px-6">{score.vreme}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
