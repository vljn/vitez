'use client';

import { signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOutClient() {
  const router = useRouter();

  useEffect(() => {
    signOut();
    router.push('/login');
  });

  return;
}
