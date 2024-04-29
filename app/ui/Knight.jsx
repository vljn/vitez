'use client';

import React, { useEffect, useState } from 'react';
import KnightImage from '../../public/knight-board.svg';
import Image from 'next/image';

export default function Knight({ position, moving }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const updateKnightSize = () => {
      if (position) {
        const { x, y } = position;
        const squareWidth = parseFloat(getComputedStyle(document.querySelector('.square')).width);
        const diff = 10;
        const knightSize = squareWidth - diff;
        const xPosition = x * squareWidth + diff / 2;
        const yPosition = y * squareWidth + diff / 2;
        setStyle({
          transform: `translate(${xPosition}px, ${yPosition}px)`,
          width: `${knightSize}px`,
        });
      }
    };

    updateKnightSize();

    window.addEventListener('resize', updateKnightSize);

    return () => {
      window.removeEventListener('resize', updateKnightSize);
    };
  }, [position]);

  if (!position) return null;

  return (
    <Image
      src={KnightImage}
      alt="Knight"
      style={{
        ...style,
        transition: 'transform 0.5s ease-in-out',
        position: 'absolute',
      }}
    />
  );
}
