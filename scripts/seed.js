const { db } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

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

scores = [
  {
    rezultat: 64,
    datum: '2024-05-09 12:00:00',
    id_korisnika: '17a9ccec-104f-41bf-ad13-18cd51f18b9e',
    izazov: 'konjicki skok',
  },
  {
    rezultat: 33,
    datum: '2024-05-08 16:40',
    id_korisnika: '17a9ccec-104f-41bf-ad13-18cd51f18b9e',
    izazov: 'konjicki skok',
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
          ON CONFLICT DO NOTHING;
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

async function seedScores(client) {
  try {
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS rezultati(
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      rezultat INT NOT NULL,
      datum TIMESTAMP DEFAULT now() NOT NULL,
      id_korisnika UUID NOT NULL,
      izazov VARCHAR(15) NOT NULL,
      CONSTRAINT fk_korisnik_id
      FOREIGN KEY(id_korisnika)
      REFERENCES korisnici(id),
      UNIQUE(id_korisnika, datum)
    )`;

    console.log('Tabela "rezultati" napravljena.');

    const insertedScores = await Promise.all(
      scores.map(async (score) => {
        return client.sql`
          INSERT INTO rezultati (rezultat, datum, id_korisnika, izazov)
          VALUES (${score.rezultat}, ${score.datum}, ${score.id_korisnika}, ${score.izazov})
          ON CONFLICT DO NOTHING;
        `;
      })
    );

    console.log(`Ubaceno ${insertedScores.length} rezultata`);

    return { createTable, insertedScores };
  } catch (error) {
    console.error('Error: ' + error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedScores(client);

  await client.end();
}

main().catch((err) => {
  console.error('Error: ' + err);
});
