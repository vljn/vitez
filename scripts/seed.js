const { db } = require('@vercel/postgres');
import bcrypt from 'bcryptjs';

users = [
  {
    korisnicko_ime: 'veljan',
    mejl: 'atanaskovicveljko80@gmail.com',
    sifra: 'veljkoveljko',
    uloga: 'admin',
  },
  {
    korisnicko_ime: 'test',
    mejl: 'test@test.com',
    sifra: 'testtest',
    uloga: 'korisnik',
  },
];

async function seedUsers(client) {
  try {
    const createTable = await db.sql`
      CREATE TABLE IF NOT EXISTS korisnici(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        korisnicko_ime VARCHAR(50) NOT NULL UNIQUE,
        mejl VARCHAR(100) NOT NULL UNIQUE,
        sifra VARCHAR(100) NOT NULL,
        uloga VARCHAR(10) DEFAULT 'korisnik' NOT NULL
      )`;

    console.log('Tabela "korisnici" napravljena.');

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.sifra, 10);
        return client.sql`
          INSERT INTO korisnici (korisnicko_ime, mejl, sifra, uloga)
          VALUES (${user.korisnicko_ime}, ${user.mejl}, ${hashedPassword}, ${user.uloga})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(`Ubaceno ${insertedUsers.length} korisnika`);

    return {
      createTable,
      insertedUsers,
    };
  } catch (error) {
    console.error('Error: ' + error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);

  await client.end();
}

main().catch((err) => {
  console.error('Error: ' + err);
});
