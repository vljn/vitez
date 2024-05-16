import Link from 'next/link';

export default function AccountLink({ children, href, active }) {
  return (
    <Link
      href={href}
      className={`${
        active ? 'bg-primary text-knight-white' : 'hover:bg-secondary'
      } flex gap-6 items-center mb-2 rounded-lg p-2 transition-colors`}
    >
      {children}
    </Link>
  );
}
