'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SidenavLink({ children, href, showCallback }) {
  const path = usePathname();

  return (
    <Link
      className={`${path === href ? 'font-bold' : 'hover:underline'} `}
      href={href}
      onClick={() => showCallback(false)}
    >
      {children}
    </Link>
  );
}
