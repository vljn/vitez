import Links from '../../ui/nalog/links';
import { UserIcon, KeyIcon } from '@heroicons/react/24/outline';

const links = [
  { id: 0, href: '/nalog', icon: <UserIcon className="w-6" />, label: 'Налог' },
  { id: 1, href: '/nalog/lozinka', icon: <KeyIcon className="w-6" />, label: 'Промена лозинке' },
];

export default async function Layout({ children }) {
  return (
    <>
      <div className="px-8 lg:grid lg:grid-cols-4 lg:gap-14">
        <aside>
          <Links links={links} />
        </aside>
        <div className="lg:col-span-3">{children}</div>
      </div>
    </>
  );
}
