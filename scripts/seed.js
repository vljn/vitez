const { db } = require('../app/lib/db');
const bcrypt = require('bcryptjs');

const users = [
  {
    korisnicko_ime: 'adminUser',
    mejl: 'admin@example.com',
    sifra: 'Admin1234',
    uloga: 'admin',
  },
  {
    korisnicko_ime: 'demoUser',
    mejl: 'demo@example.com',
    sifra: 'Demo1234',
    uloga: 'korisnik',
  },
];

const scores = [
  {
    rezultat: 64,
    pocetak: '2024-05-09 12:00:00',
    kraj: '2024-05-09 12:01:45',
    korisnicko_ime: 'adminUser',
    tip: 'konjicki skok',
    status: 'zavrsio',
  },
  {
    rezultat: 64,
    pocetak: '2024-05-11 13:02:00',
    kraj: '2024-05-11 13:03:50',
    korisnicko_ime: 'adminUser',
    tip: 'konjicki skok',
    status: 'zavrsio',
  },
  {
    rezultat: 33,
    pocetak: '2024-05-08 16:40:00',
    kraj: '2024-05-08 16:40:40',
    korisnicko_ime: 'adminUser',
    tip: 'konjicki skok',
    status: 'zavrsio',
  },
  {
    rezultat: 47,
    pocetak: '2024-05-09 13:27:00',
    kraj: '2024-05-09 13:28:22',
    korisnicko_ime: 'demoUser',
    tip: 'konjicki skok',
    status: 'zavrsio',
  },
];

const challenges = [
  {
    start: { x: 0, y: 0 },
    end: { x: 6, y: 6 },
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

    const insertedUsers = [];
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.sifra, 10);
      const result = await client.sql`
        INSERT INTO korisnici (korisnicko_ime, mejl, sifra, uloga)
        VALUES (${user.korisnicko_ime}, ${user.mejl}, ${hashedPassword}, ${user.uloga})
        ON CONFLICT DO NOTHING
        RETURNING id;
      `;
      insertedUsers.push(result);
    }

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
      id_korisnika UUID NOT NULL,
      tip VARCHAR(15) NOT NULL,
      status VARCHAR(10),
      CONSTRAINT fk_korisnik_id
      FOREIGN KEY(id_korisnika) REFERENCES korisnici(id) ON DELETE CASCADE,
      UNIQUE(id_korisnika, pocetak, kraj, tip, rezultat)
    )`;

    console.log('Tabela "rezultati" napravljena.');

    const insertedScores = [];
    for (const score of scores) {
      const user = await client.sql`
        SELECT id FROM korisnici WHERE korisnicko_ime = ${score.korisnicko_ime}
      `;

      if (user.length === 0) {
        throw new Error(`Korisnik "${score.korisnicko_ime}" ne postoji.`);
      }

      const result = await client.sql`
        INSERT INTO rezultati (rezultat, pocetak, kraj, id_korisnika, tip, status)
        VALUES (${score.rezultat}, ${score.pocetak}, ${score.kraj}, ${user[0].id}, ${score.tip}, ${score.status})
        ON CONFLICT DO NOTHING;
      `;
      insertedScores.push(result);
    }

    console.log(`Ubaceno ${insertedScores.length} rezultata`);

    return { createTable, insertedScores };
  } catch (error) {
    console.error('Error: ' + error);
    throw error;
  }
}

async function seedChallenges(client) {
  try {
    await client.sql`
      CREATE TABLE IF NOT EXISTS izazovi(
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        datum DATE DEFAULT CURRENT_DATE UNIQUE NOT NULL,
        pocetak_x INTEGER NOT NULL,
        pocetak_y INTEGER NOT NULL,
        kraj_x INTEGER NOT NULL,
        kraj_y INTEGER NOT NULL
      )`;

    console.log('Tabela "izazovi" napravljena.');

    await client.sql`
      CREATE TABLE IF NOT EXISTS izazovi_figure (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        figura VARCHAR(10) NOT NULL,
        x INTEGER NOT NULL,
        y INTEGER NOT NULL,
        id_izazova UUID NOT NULL,
        FOREIGN KEY(id_izazova) REFERENCES izazovi(id) ON DELETE CASCADE
      )
    `;

    console.log('Tabela "izazovi_figure" napravljena.');

    const insertedChallenges = await Promise.all(
      challenges.map(async (challenge) => {
        return client.sql`
          INSERT INTO izazovi (pocetak_x, pocetak_y, kraj_x, kraj_y)
          VALUES (${challenge.start.x}, ${challenge.start.y}, ${challenge.end.x}, ${challenge.end.y})
          ON CONFLICT DO NOTHING;
        `;
      }),
    );

    console.log(`Ubaceno ${insertedChallenges.length} izazova`);
  } catch (error) {
    console.error('Error: ' + error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await seedUsers(client);
  await seedScores(client);
  await seedChallenges(client);

  await client.end();
}

main().catch((err) => {
  console.error('Error: ' + err);
});
