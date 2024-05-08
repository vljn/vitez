'use client';

import React, { useEffect, useState } from 'react';
import KnightImage from '../../public/knight-board.svg';
import Image from 'next/image';

export default function Knight({ position, selected }) {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const updateKnightSize = () => {
      if (position) {
        const { x, y } = position;
        const squareWidth = parseFloat(getComputedStyle(document.querySelector('.square')).width);
        const margin = 2;
        const diff = 10;
        const knightSize = squareWidth - diff;
        const xPosition = x * squareWidth + (diff + margin) / 2;
        const yPosition = y * squareWidth + (diff + margin) / 2;
        setStyle({
          transform: `translate(${xPosition}px, ${yPosition}px) ${
            selected ? 'scale(1.4)' : 'scale(1)'
          }`,
          width: `${knightSize}px`,
        });
      }
    };

    updateKnightSize();

    window.addEventListener('resize', updateKnightSize);

    return () => {
      window.removeEventListener('resize', updateKnightSize);
    };
  }, [position, selected]);

  if (!position) return null;

  return (
    <Image
      className={`${selected && 'drop-shadow-xl'} z-20`}
      src={KnightImage}
      alt="Knight"
      style={{
        ...style,
        transition: 'transform 0.25s',
        position: 'absolute',
      }}
    />
  );
}
