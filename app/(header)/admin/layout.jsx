import Links from '@/app/ui/nalog/links';
import { UsersIcon, TableCellsIcon, PuzzlePieceIcon } from '@heroicons/react/24/outline';
import {
  UsersIcon as UsersIconSolid,
  TableCellsIcon as TableCellsIconSolid,
  PuzzlePieceIcon as PuzzlePieceIconSolid,
} from '@heroicons/react/24/solid';

const links = [
  {
    id: 0,
    label: 'Корисници',
    href: '/admin/korisnici',
    icon: <UsersIcon className="w-6" />,
    iconActive: <UsersIconSolid className="w-6" />,
  },
  {
    id: 1,
    label: 'Резултати',
    href: '/admin/rezultati',
    icon: <TableCellsIcon className="w-6" />,
    iconActive: <TableCellsIconSolid className="w-6" />,
  },
  {
    id: 2,
    label: 'Изазови',
    href: '/admin/izazovi',
    icon: <PuzzlePieceIcon className="w-6" />,
    iconActive: <PuzzlePieceIconSolid className="w-6" />,
  },
];

export default function Layout({ children }) {
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
