'use client';

import Menu from './menuButton';
import Title from './title';
import LoginButton from './loginButton';
import { useState } from 'react';
import MenuButton from './menuButton';
import Sidenav from './sidenav';

export default function Header({ session }) {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <header className="flex justify-between items-center px-8 py-4">
        <Title>Витез</Title>
        <div className="flex items-center gap-6 sm:gap-10">
          {!session?.user && <LoginButton />}
          <MenuButton isShowing={isShowing} setIsShowing={setIsShowing} />
        </div>
      </header>
      <Sidenav show={isShowing} session={session} showCallback={setIsShowing} />
    </>
  );
}
