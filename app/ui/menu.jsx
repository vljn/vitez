'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import Sidenav from './sidenav';
import { useState } from 'react';

export default function Menu({ session }) {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsShowing(!isShowing)}
        className={`transition-colors box-border absolute top-7 right-8 z-40 border-2 rounded ${
          isShowing
            ? 'bg-none lg:bg-secondary lg:border-primary text-knight-white lg:text-primary border-transparent'
            : 'bg-secondary border-primary'
        }`}
      >
        <Bars3Icon className="w-8" />
      </button>
      <Sidenav show={isShowing} session={session} />
      {isShowing ? (
        <div
          onClick={() => setIsShowing(false)}
          className="w-svw h-svh absolute z-20 bg-black opacity-50 animate-fadeHalf"
        ></div>
      ) : null}
    </>
  );
}
