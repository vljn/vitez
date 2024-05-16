'use client';

import { usePathname } from 'next/navigation';
import { UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import AccountLink from './link';

export default function Links() {
  const pathName = usePathname();

  return (
    <nav>
      <AccountLink href="/nalog" active={pathName === '/nalog'}>
        <UserIcon className="w-6" />
        <span>Налог</span>
      </AccountLink>
      <AccountLink href="/nalog/lozinka" active={pathName === '/nalog/lozinka'}>
        <KeyIcon className="w-6" />
        <span>Промена лозинке</span>
      </AccountLink>
    </nav>
  );
}
