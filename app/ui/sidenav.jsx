import Link from 'next/link';
import BackgroundSwitcher from './backgroundSwitcher';
import { signOut } from 'next-auth/react';

export default function Sidenav({ show, session }) {
  return (
    <nav
      className={`h-svh w-svw text-knight-white py-10 px-8 bg-primary absolute z-10`}
      style={{
        transform: show ? 'translateX(0)' : 'translateX(-100svw)',
        transitionDuration: '300ms',
      }}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          {session?.user ? (
            <h1 className="text-lg">
              Здраво, <span>{session.user.name}</span>
            </h1>
          ) : (
            <Link href="/login">
              <h1>Улогуј се</h1>
            </Link>
          )}
          <hr />
        </div>
        <div>
          {session?.user && <button onClick={() => signOut()}>Излогуј се</button>}
          <hr className="my-3" />
          <div className="flex justify-between">
            <BackgroundSwitcher />
            <h2>вљн :)</h2>
          </div>
        </div>
      </div>
    </nav>
  );
}
