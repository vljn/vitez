import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
const bcrypt = require('bcrypt');
import { sql } from '@vercel/postgres';
import { authConfig } from './auth.config';
import { redirect } from 'next/navigation';

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        const { rows } =
          await sql`SELECT * FROM korisnici WHERE korisnicko_ime = ${credentials.username}`;
        user = rows[0];

        if (!user) {
          return null;
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.sifra);
        if (passwordMatch) {
          return { name: user['korisnicko_ime'] };
        }
        return null;
      },
    }),
  ],
});
