import { sql } from '@vercel/postgres';

export async function getUser(id) {
  try {
    const { rows } = await sql`SELECT * FROM korisnici WHERE id = ${id}`;
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

export async function getHighestScores(challenge) {
  try {
    const { rows } = await sql`
      WITH RankedResults AS (
      SELECT 
        korisnicko_ime,
        rezultat,
        ROUND(EXTRACT(EPOCH FROM kraj - pocetak), 2) AS vreme,
        ROW_NUMBER() OVER (PARTITION BY id_korisnika ORDER BY rezultat DESC, kraj - pocetak ASC) AS Rank
      FROM rezultati
      JOIN korisnici
      ON korisnici.id = id_korisnika
      WHERE izazov = 'konjicki skok' AND status = 'zavrsio'
      )
      SELECT 
        korisnicko_ime,
        rezultat,
        vreme
      FROM RankedResults
      WHERE Rank = 1
      ORDER BY rezultat DESC, vreme ASC`;

    return rows;
  } catch (error) {
    console.error(error);
  }
}

export async function getTodaysChallenge() {
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
  try {
    const { rows } = await sql`
    SELECT id, figura, x, y FROM izazovi_figure
    WHERE id_izazova = (SELECT id FROM izazovi WHERE datum = CURRENT_DATE)`;

    return rows;
  } catch (error) {
    console.error(error);
  }
}
