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
    pocetak: '2024-05-09 12:00:00',
    kraj: '2024-05-09 12:01:45',
    id_korisnika: '17a9ccec-104f-41bf-ad13-18cd51f18b9e',
    izazov: 'konjicki skok',
    status: 'zavrsio',
  },
  {
    rezultat: 64,
    pocetak: '2024-05-11 13:02:00',
    kraj: '2024-05-11 13:03:50',
    id_korisnika: '17a9ccec-104f-41bf-ad13-18cd51f18b9e',
    izazov: 'konjicki skok',
    status: 'zavrsio',
  },
  {
    rezultat: 33,
    pocetak: '2024-05-08 16:40:00',
    kraj: '2024-05-08 16:40:40',
    id_korisnika: '17a9ccec-104f-41bf-ad13-18cd51f18b9e',
    izazov: 'konjicki skok',
    status: 'zavrsio',
  },
  {
    rezultat: 47,
    pocetak: '2024-05-09 13:27:00',
    kraj: '2024-05-09 13:38:22',
    id_korisnika: '4e9422cd-4a75-41ac-add5-b555e9b00ede',
    izazov: 'konjicki skok',
    status: 'zavrsio',
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
      rezultat INT,
      pocetak TIMESTAMP DEFAULT now() NOT NULL,
      kraj TIMESTAMP,
      id_korisnika UUID,
      izazov VARCHAR(15) NOT NULL,
      status VARCHAR(10),
      CONSTRAINT fk_korisnik_id
      FOREIGN KEY(id_korisnika)
      REFERENCES korisnici(id),
      UNIQUE(id_korisnika, pocetak, kraj, izazov, rezultat)
    )`;

    console.log('Tabela "rezultati" napravljena.');

    const insertedScores = await Promise.all(
      scores.map(async (score) => {
        return client.sql`
          INSERT INTO rezultati (rezultat, pocetak, kraj, id_korisnika, izazov, status)
          VALUES (${score.rezultat}, ${score.pocetak}, ${score.kraj}, ${score.id_korisnika}, ${score.izazov}, ${score.status})
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
