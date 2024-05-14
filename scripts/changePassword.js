const { sql } = require('@vercel/postgres');
const bcrypt = require('bcryptjs');

const username = process.argv[2];
const password = process.argv[3];

try {
  bcrypt
    .hash(password, 10)
    .then((p) => sql`UPDATE korisnici SET sifra = ${p} WHERE korisnicko_ime = ${username}`);
} catch (error) {
  console.error(error);
}
