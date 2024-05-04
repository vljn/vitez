'use client';

import { usePathname } from 'next/navigation';
import { UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import ProfileLink from './link';

export default function Links() {
  const pathName = usePathname();

  return (
    <nav>
      <ProfileLink href="/nalog" active={pathName === '/nalog'}>
        <UserIcon className="w-6" />
        <span>Налог</span>
      </ProfileLink>
      <ProfileLink href="/nalog/lozinka" active={pathName === '/nalog/lozinka'}>
        <KeyIcon className="w-6" />
        <span>Промена лозинке</span>
      </ProfileLink>
    </nav>
  );
}
