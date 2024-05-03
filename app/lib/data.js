import { sql } from '@vercel/postgres';

export async function getUser(id) {
  try {
    const { rows } = await sql`SELECT * FROM korisnici WHERE id = ${id}`;
    return rows[0];
  } catch (error) {
    console.error(error);
  }
}
