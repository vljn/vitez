'use client';

import { usePathname } from 'next/navigation';
import { UserIcon, KeyIcon } from '@heroicons/react/24/outline';
import AccountLink from './link';

export default function Links({ links = [] }) {
  const pathName = usePathname();

  return (
    <nav>
      {links.map((link) => (
        <AccountLink key={link.id} href={link.href} active={pathName === link.href}>
          {pathName !== link.href ? link.icon : link.iconActive}
          <span>{link.label}</span>
        </AccountLink>
      ))}
    </nav>
  );
}
