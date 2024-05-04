'use client';

import Title from './title';
import LoginButton from './loginButton';
import { useState } from 'react';
import MenuButton from './menuButton';
import Sidenav from './sidenav';

export default function HeaderAndSidenav({ username, link }) {
  const [isShowing, setIsShowing] = useState(false);
  console.log(username);

  return (
    <>
      <header className="flex justify-between items-center px-8 py-4 lg:mb-10">
        <Title link={link}>Витез</Title>
        <div className="flex items-center gap-6 sm:gap-10">
          {username ? null : <LoginButton />}
          <MenuButton isShowing={isShowing} setIsShowing={setIsShowing} />
        </div>
      </header>
      <Sidenav show={isShowing} showCallback={setIsShowing} username={username} />
    </>
  );
}
