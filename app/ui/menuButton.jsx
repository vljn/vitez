'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import Sidenav from './sidenav';
import { useState, useEffect } from 'react';

export default function MenuButton({ isShowing, setIsShowing }) {
  useEffect(() => {
    const body = document.querySelector('body');
    if (isShowing) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
  }, [isShowing]);

  function handleClick() {
    setIsShowing(!isShowing);
  }

  return (
    <>
      <button
        onClick={handleClick}
        className={`transition-colors box-border relative z-50 border-2 rounded ${
          isShowing
            ? 'bg-none lg:bg-secondary lg:border-primary text-knight-white lg:text-primary border-transparent hover:lg:bg-primary hover:lg:text-knight-white'
            : 'bg-secondary border-primary hover:lg:bg-primary hover:lg:text-knight-white'
        }`}
      >
        <Bars3Icon className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10" />
      </button>
    </>
  );
}
