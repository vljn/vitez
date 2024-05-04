'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function SignOutClient() {
  useEffect(() => {
    signOut({ callbackUrl: 'http://localhost:3000/login' });
  });

  return;
}
