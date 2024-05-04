'use client';

import { useState } from 'react';
import SignOutClient from './signOutClient.jsx';

export function SignOutButton() {
  const [clicked, setClicked] = useState(false);

  return (
    <>
      {clicked && <SignOutClient />}
      <button onClick={() => setClicked(true)} className="hover:underline">
        Излогуј се
      </button>
    </>
  );
}
