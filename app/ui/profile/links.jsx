'use client';

import { usePathname } from 'next/navigation';
import { UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import ProfileLink from './link';

export default function Links() {
  const pathName = usePathname();
  console.log(pathName);

  return (
    <nav>
      <ProfileLink href="/profile" active={pathName === '/profile'}>
        <UserIcon className="w-6" />
        <span>Профил</span>
      </ProfileLink>
      <ProfileLink href="/profile/password" active={pathName === '/profile/password'}>
        <KeyIcon className="w-6" />
        <span>Промена лозинке</span>
      </ProfileLink>
    </nav>
  );
}
