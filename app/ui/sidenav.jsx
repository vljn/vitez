import Link from 'next/link';
import BackgroundSwitcher from './backgroundSwitcher';
import { signOut } from 'next-auth/react';

export default function Sidenav({ show, session, showCallback }) {
  return (
    <>
      {show ? (
        <div
          onClick={() => showCallback(false)}
          className="w-svw h-svh absolute z-30 bg-black opacity-50 animate-fadeHalf"
        ></div>
      ) : null}
      <nav
        className={`h-svh w-svw lg:w-96 text-knight-white py-10 px-8 bg-primary absolute z-40`}
        style={{
          transform: show ? 'translateX(0)' : 'translateX(-100svw)',
          transition: 'transform 300ms ease-in-out',
        }}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            {session?.user ? (
              <h1 className="text-lg max-lg:mr-10">
                Здраво, <span>{session.user.name}</span>
              </h1>
            ) : (
              <Link href="/login">
                <h1 className="hover:underline">Улогуј се</h1>
              </Link>
            )}
            <hr />
          </div>
          <div>
            {session?.user && (
              <button className="hover:underline" onClick={() => signOut()}>
                Излогуј се
              </button>
            )}
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
