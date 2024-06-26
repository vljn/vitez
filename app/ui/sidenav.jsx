import Link from 'next/link';
import BackgroundSwitcher from './backgroundSwitcher';
import { Cog6ToothIcon, WrenchIcon } from '@heroicons/react/24/solid';
import { SignOutButton } from './signOutButton';
import SidenavLink from './sidenavLink';

const pages = [
  { id: 1, link: '/', label: 'Почетна' },
  { id: 2, link: '/najkraci-put', label: 'Најкраћи пут' },
  { id: 3, link: '/najkraci-put-izazov', label: 'Најкраћи пут: изазов' },
  { id: 4, link: '/problem_konjickog_skoka', label: 'Проблем коњичког скока' },
  { id: 5, link: '/konjicki-skok-izazov', label: 'Коњички скок: изазов' },
];

export default function Sidenav({ show, showCallback, username, isAdmin }) {
  const links = pages.map((page) => (
    <div className="mt-8 text-lg" key={page.id}>
      <SidenavLink href={page.link} showCallback={showCallback}>
        {page.label}
      </SidenavLink>
    </div>
  ));
  return (
    <>
      {show ? (
        <div
          onClick={() => showCallback(false)}
          className="fixed top-0 h-dvh w-dvw z-30 bg-black opacity-50 animate-fadeHalf"
        ></div>
      ) : null}
      <nav
        className={`fixed left-0 top-0 h-dvh w-dvw lg:w-96 z-40 text-knight-white py-10 px-8 pt-20 md:pt-24 bg-primary`}
        style={{
          transform: show ? 'translateX(0)' : 'translateX(-100svw)',
          transition: 'transform 300ms ease-in-out',
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            {username && (
              <h1 className="text-lg max-lg:mr-10">
                Здраво, <span>{username}</span>
              </h1>
            )}
            <hr />
            {links}
          </div>
          <div>
            <div className="flex justify-between items-center">
              {username && (
                <>
                  <SignOutButton />
                  <div className="flex gap-2">
                    {isAdmin && (
                      <Link href="/admin">
                        <WrenchIcon
                          className="w-6 hover:-rotate-45 transition-transform duration-500"
                          onClick={() => showCallback(false)}
                        />
                      </Link>
                    )}
                    <Link href="/nalog">
                      <Cog6ToothIcon
                        className="w-6 hover:rotate-90 transition-transform duration-500"
                        onClick={() => showCallback(false)}
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>
            <hr className="my-3" />
            <div className="flex justify-between">
              <div>
                <BackgroundSwitcher />
                <i className="block text-sm">by пнт &#58;&#41;</i>
              </div>
              <h2>вљн &#58;&#41;</h2>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
