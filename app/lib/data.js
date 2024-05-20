import { sql } from '@vercel/postgres';
import { unstable_noStore } from 'next/cache';
import { InvalidChallengeError } from './errors';

export async function getUser(id) {
  try {
    const { rows } =
      await sql`SELECT id, korisnicko_ime, mejl, uloga FROM korisnici WHERE id = ${id}`;
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers() {
  unstable_noStore();
  try {
    const { rows } = await sql`SELECT id, korisnicko_ime, mejl, uloga FROM korisnici`;
    return rows;
  } catch (error) {
    console.error(error);
  }
}

export async function getScores(challenge, orderBy = [{ column: 'pocetak', direction: 'ASC' }]) {
  unstable_noStore();
  const allowedColumns = ['id', 'rezultat', 'tip', 'vreme', 'pocetak', 'kraj'];
  const allowedDirections = ['ASC', 'DESC'];
  const allowedChallenges = ['konjicki skok', 'najkraci put'];

  for (const criterion of orderBy) {
    if (!allowedColumns.includes(criterion.column)) {
      throw new Error(`Invalid column to order by: ${criterion.column}`);
    }
    if (!allowedDirections.includes(criterion.direction)) {
      throw new Error(`Invalid order direction: ${criterion.direction}`);
    }
  }

  if (challenge && !allowedChallenges.includes(challenge)) {
    throw new InvalidChallengeError(`Invalid challenge: ${challenge}`);
  }

  const orderClause = orderBy
    .map((criterion) => `${criterion.column} ${criterion.direction}`)
    .join(', ');

  const whereClause = challenge ? `WHERE tip = '${challenge}'` : '';

  try {
    const query = `
      SELECT rezultati.id, rezultat, korisnicko_ime, tip, status, ROUND(EXTRACT(EPOCH FROM kraj - pocetak), 2) AS vreme, pocetak::date AS datum
      FROM rezultati
      JOIN korisnici ON korisnici.id = id_korisnika
      ${whereClause}
      ORDER BY ${orderClause}
    `;

    const { rows } = await sql.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

export async function getHighestScores(challenge) {
  const sort = challenge === 'konjicki skok' ? 'DESC' : 'ASC';
  try {
    const query = `
      WITH RankedResults AS (
        SELECT 
          korisnicko_ime,
          rezultat,
          ROUND(EXTRACT(EPOCH FROM kraj - pocetak), 2) AS vreme,
          ROW_NUMBER() OVER (PARTITION BY id_korisnika ORDER BY rezultat ${sort}, kraj - pocetak ASC) AS Rank
        FROM rezultati
        JOIN korisnici
        ON korisnici.id = id_korisnika
        WHERE tip = $1 AND status = 'zavrsio' ${
          challenge === 'najkraci put' ? 'AND pocetak::date = CURRENT_DATE' : ''
        }
      )
      SELECT 
        korisnicko_ime,
        rezultat,
        vreme
      FROM RankedResults
      WHERE Rank = 1
      ORDER BY rezultat ${sort}, vreme ASC
    `;

    const { rows } = await sql.query(query, [challenge]);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

export async function getTodaysChallenge() {
  unstable_noStore();
  try {
    const { rows } = await sql`
    SELECT * FROM izazovi
    WHERE datum = CURRENT_DATE`;

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getTodaysChallengeFigures() {
  unstable_noStore();
  try {
    const { rows } = await sql`
    SELECT id, figura, x, y FROM izazovi_figure
    WHERE id_izazova = (SELECT id FROM izazovi WHERE datum = CURRENT_DATE)`;

    return rows;
  } catch (error) {
    console.error(error);
  }
}
