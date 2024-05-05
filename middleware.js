import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

const protectedRoutes = ['/nalog'];
const authRoutes = ['/login', '/registracija'];

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isProtectedRoute = protectedRoutes.some((prefix) => nextUrl.pathname.startsWith(prefix));
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (!isAuthenticated && isProtectedRoute) {
    return Response.redirect(new URL('/login', nextUrl.origin));
  }

  if (isAuthenticated && isAuthRoute) {
    return Response.redirect(new URL(nextUrl.origin));
  }
});
