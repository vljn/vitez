'use client';

import Title from './title';
import LoginButton from './loginButton';
import { useState, useEffect } from 'react';
import MenuButton from './menuButton';
import Sidenav from './sidenav';

export default function HeaderAndSidenav({ username }) {
  const [isShowing, setIsShowing] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);

  useEffect(() => {
    const scrollEvent = () => {
      if (window.scrollY >= 48) {
        setHeaderBackground(true);
      } else {
        setHeaderBackground(false);
      }
    };

    window.addEventListener('scroll', scrollEvent);

    return () => {
      window.removeEventListener('scroll', scrollEvent);
    };
  }, []);

  return (
    <>
      <header
        className={`box-border sticky top-0 flex justify-between items-center px-8 py-4 lg:mb-10 transition-colors border-primary ${
          headerBackground && 'bg-secondary border-b-2'
        }`}
      >
        <Title>Витез</Title>
        <div className="flex items-center gap-6 sm:gap-10">
          {username ? null : <LoginButton />}
          <MenuButton isShowing={isShowing} setIsShowing={setIsShowing} />
        </div>
      </header>
      <Sidenav show={isShowing} showCallback={setIsShowing} username={username} />
    </>
  );
}
