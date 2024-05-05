export const authConfig = {
  pages: {
    signIn: '/login',
    newUser: '/registracija',
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;

      return isAuthenticated;
    },
  },
  providers: [],
};
