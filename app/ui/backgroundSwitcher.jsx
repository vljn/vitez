'use client';

import { useEffect, useState } from 'react';

export default function BackgroundSwitcher() {
  const [isOn, setIsOn] = useState(true);

  function handleChange() {
    setIsOn(!isOn);
    localStorage.setItem('background', !isOn);
  }

  useEffect(() => {
    if (localStorage.getItem('background') === 'true') {
      setIsOn(true);
      return;
    } else if (localStorage.getItem('background') === 'false') {
      setIsOn(false);
      return;
    } else {
      localStorage.setItem('background', true);
    }
  }, [isOn]);

  useEffect(() => {
    const body = document.querySelector('body');
    if (isOn) {
      body.classList.add('bg-backgroundImage');
      body.classList.remove('bg-background');
    } else {
      body.classList.add('bg-background');
      body.classList.remove('bg-backgroundImage');
    }
  }, [isOn]);

  return (
    <label htmlFor="background" className="inline-flex items-center cursor-pointer">
      <span className="mr-4">Позадина: </span>
      <input
        onChange={handleChange}
        type="checkbox"
        id="background"
        checked={isOn}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-knight-white peer-checked:bg-backgroundImage peer-checked:bg-[length:300px_100px] rounded-full peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-primary after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
    </label>
  );
}
